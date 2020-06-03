import {
  graphql,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectTypeConfig,
  GraphQLScalarType,
} from "graphql";
import { buildSchema, defaultPlugins } from "../src";

type ArrayOrNot<T> = T | T[];

declare global {
  namespace GraphileEngine {
    interface ScopeGraphQLObjectTypeFieldsField {
      isDummyConnectionField?: boolean;
    }
    interface LookAheadData {
      usesCursor?: ArrayOrNot<boolean>;
      limit?: ArrayOrNot<number>;
      sort?: ArrayOrNot<any>;
      filter?: ArrayOrNot<(obj: any, index: number) => boolean>;
      map?: ArrayOrNot<
        (
          obj: any,
          index: number,
        ) => {
          [x: string]: any;
        }
      >;
    }
  }
}

const base64 = (str: string) => Buffer.from(String(str)).toString("base64");
const base64Decode = (str: string) =>
  Buffer.from(String(str), "base64").toString("utf8");

const dummyData = [
  { ID: "foo", CAPS: "FOO" },
  { ID: "bar", CAPS: "BAR" },
  { ID: "baz", CAPS: "BAZ" },
  { ID: "qux", CAPS: "QUX" },
];

const compare = (a: number, b: number, ascending?: boolean) => {
  if (a === b) return 0;
  if (ascending) {
    return a > b ? 1 : -1;
  } else {
    return a < b ? 1 : -1;
  }
};

const DummyConnectionPlugin: GraphileEngine.Plugin = async (builder) => {
  builder.hook("GraphQLObjectType:fields", (fields, build, context) => {
    const {
      extend,
      getTypeByName,
      newWithHooks,
      parseResolveInfo,
      resolveAlias,
      getSafeAliasFromAlias,
    } = build;
    const {
      scope: { isRootQuery },
      fieldWithHooks,
    } = context;
    if (!isRootQuery) return fields;
    const Cursor = getTypeByName("Cursor") as GraphQLScalarType;
    const Dummy = newWithHooks(
      GraphQLObjectType,
      {
        name: "Dummy",
        fields: ({ addDataGeneratorForField }) => {
          addDataGeneratorForField("id", ({ alias }) => {
            return {
              map: (obj: any) => ({ [getSafeAliasFromAlias(alias)]: obj.ID }),
            };
          });
          addDataGeneratorForField("caps", ({ alias }) => {
            return {
              map: (obj: any) => ({ [getSafeAliasFromAlias(alias)]: obj.CAPS }),
            };
          });
          addDataGeneratorForField("random", ({ alias }) => {
            return {
              map: () => ({
                [getSafeAliasFromAlias(alias)]: Math.floor(
                  Math.random() * 10000,
                ),
              }),
            };
          });
          return {
            id: {
              type: new GraphQLNonNull(GraphQLString),
              resolve: resolveAlias,
            },
            caps: {
              type: new GraphQLNonNull(GraphQLString),
              resolve: resolveAlias,
            },
            random: {
              type: new GraphQLNonNull(GraphQLInt),
              resolve: resolveAlias,
            },
          };
        },
      },
      {},
    );
    return extend(
      fields,
      {
        dummyConnection: fieldWithHooks(
          "dummyConnection",
          ({
            addArgDataGenerator,
            getDataFromParsedResolveInfoFragment,
          }): import("graphql").GraphQLFieldConfig<any, any, any> => {
            addArgDataGenerator(function connectionFirst({ first }) {
              if (typeof first === "number") {
                return { limit: [first] };
              }
            });
            addArgDataGenerator(function connectionSortBy({ sortBy }) {
              if (sortBy) {
                return { sort: [sortBy] };
              }
            });
            addArgDataGenerator(function connectionAfter(
              { after },
              ReturnType,
              data,
            ) {
              const sorts = data.sort || [];
              if (typeof after === "string") {
                if (sorts.length) {
                  const afterValues = JSON.parse(base64Decode(after));
                  let filter: (obj?: any) => boolean = () => false;
                  // a > b || (a == b && (next))
                  for (let i = sorts.length - 1; i >= 0; i--) {
                    const [field, ascending] = sorts[i];
                    const oldFilter = filter;
                    filter = (obj) => {
                      if (!afterValues[i]) return true;
                      const comparison = compare(
                        afterValues[i],
                        obj[field],
                        ascending,
                      );
                      return (
                        comparison < 0 || (comparison === 0 && oldFilter(obj))
                      );
                    };
                  }
                  return {
                    filter: [filter],
                  };
                } else {
                  const afterIdx = parseInt(after, 10);
                  return {
                    filter: [(_val, idx) => idx > afterIdx],
                  };
                }
              }
            });
            return {
              type: newWithHooks(
                GraphQLObjectType,
                {
                  name: "DummyConnection",
                  fields: ({ recurseDataGeneratorsForField }) => {
                    recurseDataGeneratorsForField("edges", true);
                    recurseDataGeneratorsForField("nodes", true);
                    return {
                      edges: {
                        type: new GraphQLList(
                          new GraphQLNonNull(
                            newWithHooks(
                              GraphQLObjectType,
                              {
                                name: "DummyEdge",
                                fields: ({
                                  addDataGeneratorForField,
                                  recurseDataGeneratorsForField,
                                }) => {
                                  recurseDataGeneratorsForField("node", true);
                                  addDataGeneratorForField("cursor", () => ({
                                    usesCursor: [true],
                                  }));
                                  addDataGeneratorForField(
                                    "cursor",
                                    (
                                      parsedResolveInfoFragment,
                                      ReturnType,
                                      data,
                                    ) => {
                                      if (data.sort) {
                                        return {
                                          map: (obj) => ({
                                            __cursor: base64(
                                              JSON.stringify(
                                                data.sort!.map(
                                                  ([key]) => obj[key],
                                                ),
                                              ),
                                            ),
                                          }),
                                        };
                                      } else {
                                        return {
                                          map: (obj, idx) => ({
                                            __cursor: String(idx),
                                          }),
                                        };
                                      }
                                    },
                                  );
                                  return {
                                    cursor: {
                                      type: Cursor,
                                      resolve(data) {
                                        return data.__cursor;
                                      },
                                    },
                                    node: {
                                      type: Dummy,
                                      resolve(data) {
                                        return data;
                                      },
                                    },
                                  };
                                },
                              } as GraphileEngine.GraphileObjectTypeConfig<
                                any,
                                any
                              >,
                              {},
                            ),
                          ),
                        ),
                        resolve(data) {
                          return data;
                        },
                      },
                      nodes: {
                        type: new GraphQLList(new GraphQLNonNull(Dummy)),
                        resolve(data) {
                          return data;
                        },
                      },
                    };
                  },
                },
                {},
              ),
              args: {
                first: {
                  type: GraphQLInt,
                },
                after: {
                  type: Cursor,
                },
                sortBy: {
                  type: new GraphQLEnumType({
                    name: "DummyConnectionSortBy",
                    values: {
                      ID_ASC: {
                        value: ["ID", true],
                      },
                      ID_DESC: {
                        value: ["ID", false],
                      },
                      CAPS_ASC: {
                        value: ["CAPS", true],
                      },
                      CAPS_DESC: {
                        value: ["CAPS", false],
                      },
                    },
                  }),
                },
              },
              resolve(data, args, context, resolveInfo) {
                const parsedResolveInfoFragment = parseResolveInfo(
                  resolveInfo,
                )!;
                parsedResolveInfoFragment.args = args; // Allow overriding via makeWrapResolversPlugin
                const resolveData = getDataFromParsedResolveInfoFragment(
                  parsedResolveInfoFragment,
                  resolveInfo.returnType,
                );
                let result = dummyData.slice();
                for (const filter of resolveData.filter || []) {
                  result = result.filter(filter);
                }
                const sorts = resolveData.sort || [];
                if (sorts.length) {
                  for (let i = sorts.length - 1; i >= 0; i--) {
                    const [field, ascending] = sorts[i];
                    result.sort((a, b) =>
                      compare(a[field], b[field], ascending),
                    );
                  }
                }
                const ret = result.map((entry) => {
                  const idx = dummyData.indexOf(entry);
                  return (resolveData.map || []).reduce(
                    (memo, map) => Object.assign(memo, map(entry, idx)),
                    {},
                  );
                });
                return ret;
              },
            };
          },
          { isDummyConnectionField: true },
        ),
      },
      "TEST",
    );
  });
};

test("generated schema", async () => {
  const schema = await buildSchema([...defaultPlugins, DummyConnectionPlugin]);
  expect(schema).toMatchSnapshot();
});

test("no arguments", async () => {
  const schema = await buildSchema([...defaultPlugins, DummyConnectionPlugin]);
  const result = await graphql(
    schema,
    `
      query {
        dummyConnection {
          edges {
            cursor
            node {
              id
              caps
            }
          }
          nodes {
            id
            caps
          }
        }
      }
    `,
  );
  if (result.errors) {
    // eslint-disable-next-line no-console
    console.log(result.errors.map((e) => e.originalError));
  }
  expect(result.errors).toBeFalsy();
  expect(result.data?.dummyConnection.nodes.map((n: any) => n.id)).toEqual([
    "foo",
    "bar",
    "baz",
    "qux",
  ]);
  expect(
    result.data?.dummyConnection.edges.map(({ cursor }: any) => cursor),
  ).toEqual(["0", "1", "2", "3"]);
  expect(result).toMatchSnapshot();
});

test("sort", async () => {
  const schema = await buildSchema([...defaultPlugins, DummyConnectionPlugin]);
  const result = await graphql(
    schema,
    `
      query {
        dummyConnection(sortBy: ID_ASC) {
          edges {
            cursor
            node {
              id
              caps
            }
          }
          nodes {
            id
            caps
          }
        }
      }
    `,
  );
  if (result.errors) {
    // eslint-disable-next-line no-console
    console.log(result.errors.map((e) => e.originalError));
  }
  expect(result.errors).toBeFalsy();
  expect(result.data?.dummyConnection.nodes.map((n: any) => n.id)).toEqual([
    "bar",
    "baz",
    "foo",
    "qux",
  ]);
  expect(
    result.data?.dummyConnection.edges
      .map(({ cursor }: any) => cursor)
      .map(base64Decode),
  ).toEqual(['["bar"]', '["baz"]', '["foo"]', '["qux"]']);
  expect(result).toMatchSnapshot();
});

test("after", async () => {
  const schema = await buildSchema([...defaultPlugins, DummyConnectionPlugin]);
  const result = await graphql(
    schema,
    `
      query {
        dummyConnection(after: "1") {
          edges {
            cursor
            node {
              id
              caps
            }
          }
          nodes {
            id
            caps
          }
        }
      }
    `,
  );
  expect(result.data?.dummyConnection.nodes.map((n: any) => n.id)).toEqual([
    "baz",
    "qux",
  ]);
  expect(
    result.data?.dummyConnection.edges.map(({ cursor }: any) => cursor),
  ).toEqual(["2", "3"]);
  expect(result).toMatchSnapshot();
});

test("sort, after", async () => {
  const schema = await buildSchema([...defaultPlugins, DummyConnectionPlugin]);
  const result = await graphql(
    schema,
    `
      query {
        dummyConnection(sortBy: ID_ASC, after: "WyJiYXoiXQ==") {
          edges {
            cursor
            node {
              id
              caps
            }
          }
          nodes {
            id
            caps
          }
        }
      }
    `,
  );
  if (result.errors) {
    // eslint-disable-next-line no-console
    console.log(result.errors.map((e) => e.originalError));
  }
  expect(result.errors).toBeFalsy();
  expect(result.data?.dummyConnection.nodes.map((n: any) => n.id)).toEqual([
    "foo",
    "qux",
  ]);
  expect(
    result.data?.dummyConnection.edges
      .map(({ cursor }: any) => cursor)
      .map(base64Decode),
  ).toEqual(['["foo"]', '["qux"]']);
  expect(result).toMatchSnapshot();
});
