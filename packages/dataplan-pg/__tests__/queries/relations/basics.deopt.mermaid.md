```mermaid
graph TD
    classDef path fill:#eee,stroke:#000,color:#000
    classDef plan fill:#fff,stroke-width:3px,color:#000
    classDef itemplan fill:#fff,stroke-width:6px,color:#000
    classDef sideeffectplan fill:#f00,stroke-width:6px,color:#000
    classDef bucket fill:#f6f6f6,color:#000,stroke-width:6px,text-align:left


    %% define plans
    __Value_0["__Value[_0∈0]"]:::plan
    __Value_3["__Value[_3∈0]<br /><context>"]:::plan
    InputStaticLeaf_7["InputStaticLeaf[_7∈0]"]:::plan
    PgSelect_8[["PgSelect[_8∈0]<br /><messages>"]]:::plan
    First_12["First[_12∈0]"]:::plan
    PgSelectSingle_13["PgSelectSingle[_13∈0]<br /><messages>"]:::plan
    PgClassExpression_14["PgClassExpression[_14∈0]<br /><__messages__.”id”>"]:::plan
    PgClassExpression_15["PgClassExpression[_15∈0]<br /><__messages__.”body”>"]:::plan
    PgClassExpression_16["PgClassExpression[_16∈0]<br /><__messages__.”forum_id”>"]:::plan
    PgSelect_17[["PgSelect[_17∈0]<br /><forums>"]]:::plan
    Access_18["Access[_18∈0]<br /><_3.pgSettings>"]:::plan
    Access_19["Access[_19∈0]<br /><_3.withPgClient>"]:::plan
    Object_20["Object[_20∈0]<br /><{pgSettings,withPgClient}>"]:::plan
    First_21["First[_21∈0]"]:::plan
    PgSelectSingle_22["PgSelectSingle[_22∈0]<br /><forums>"]:::plan
    PgClassExpression_24["PgClassExpression[_24∈0]<br /><__forums__.”name”>"]:::plan

    %% plan dependencies
    Object_20 --> PgSelect_8
    InputStaticLeaf_7 --> PgSelect_8
    PgSelect_8 --> First_12
    First_12 --> PgSelectSingle_13
    PgSelectSingle_13 --> PgClassExpression_14
    PgSelectSingle_13 --> PgClassExpression_15
    PgSelectSingle_13 --> PgClassExpression_16
    Object_20 --> PgSelect_17
    PgClassExpression_16 --> PgSelect_17
    __Value_3 --> Access_18
    __Value_3 --> Access_19
    Access_18 --> Object_20
    Access_19 --> Object_20
    PgSelect_17 --> First_21
    First_21 --> PgSelectSingle_22
    PgSelectSingle_22 --> PgClassExpression_24

    %% plan-to-path relationships
    P_0["~"]
    __Value_0 -.-> P_0
    P_13[">message"]
    PgSelectSingle_13 -.-> P_13
    P_14[">m…e>id"]
    PgClassExpression_14 -.-> P_14
    P_15[">m…e>body"]
    PgClassExpression_15 -.-> P_15
    P_16[">m…e>f…m>id"]
    PgClassExpression_16 -.-> P_16
    P_22[">m…e>forum"]
    PgSelectSingle_22 -.-> P_22
    P_24[">m…e>f…m>name"]
    PgClassExpression_24 -.-> P_24

    %% allocate buckets
    classDef bucket0 stroke:#696969
    class __Value_0,__Value_3,InputStaticLeaf_7,PgSelect_8,First_12,PgSelectSingle_13,PgClassExpression_14,PgClassExpression_15,PgClassExpression_16,PgSelect_17,Access_18,Access_19,Object_20,First_21,PgSelectSingle_22,PgClassExpression_24 bucket0

    subgraph "Buckets for queries/relations/basics"
    Bucket0("Bucket 0 (root)<br />~<br />⠀ROOT <-O- _0<br />⠀⠀message <-O- _13<br />⠀⠀⠀message.id <-L- _14<br />⠀⠀⠀message.body <-L- _15<br />⠀⠀⠀message.forum <-O- _22<br />⠀⠀⠀⠀message.forum.id <-L- _16<br />⠀⠀⠀⠀message.forum.name <-L- _24"):::bucket
    style Bucket0 stroke:#696969
    end
```