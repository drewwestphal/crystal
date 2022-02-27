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
    PgSelect_7[["PgSelect[_7∈0]<br /><random_user_array>"]]:::plan
    Access_8["Access[_8∈0]<br /><_3.pgSettings>"]:::plan
    Access_9["Access[_9∈0]<br /><_3.withPgClient>"]:::plan
    Object_10["Object[_10∈0]<br /><{pgSettings,withPgClient}>"]:::plan
    __Item_11>"__Item[_11∈1]<br /><_7>"]:::itemplan
    PgSelectSingle_12["PgSelectSingle[_12∈1]<br /><random_user_array>"]:::plan
    PgClassExpression_13["PgClassExpression[_13∈1]<br /><__random_u...”username”>"]:::plan
    PgClassExpression_14["PgClassExpression[_14∈1]<br /><__random_u...vatar_url”>"]:::plan

    %% plan dependencies
    Object_10 --> PgSelect_7
    __Value_3 --> Access_8
    __Value_3 --> Access_9
    Access_8 --> Object_10
    Access_9 --> Object_10
    PgSelect_7 ==> __Item_11
    __Item_11 --> PgSelectSingle_12
    PgSelectSingle_12 --> PgClassExpression_13
    PgSelectSingle_12 --> PgClassExpression_14

    %% plan-to-path relationships
    P_0["~"]
    __Value_0 -.-> P_0
    P_7[">randomUserArray"]
    PgSelect_7 -.-> P_7
    P_12[">randomUserArray[]"]
    PgSelectSingle_12 -.-> P_12
    P_13[">r…]>username"]
    PgClassExpression_13 -.-> P_13
    P_14[">r…]>gravatarUrl"]
    PgClassExpression_14 -.-> P_14

    %% allocate buckets
    classDef bucket0 stroke:#696969
    class __Value_0,__Value_3,PgSelect_7,Access_8,Access_9,Object_10 bucket0
    classDef bucket1 stroke:#00bfff
    class __Item_11,PgSelectSingle_12,PgClassExpression_13,PgClassExpression_14 bucket1

    subgraph "Buckets for queries/functions/custom-query-random-user-array"
    Bucket0("Bucket 0 (root)<br />~<br />⠀ROOT <-O- _0<br />⠀⠀randomUserArray <-A- _7"):::bucket
    style Bucket0 stroke:#696969
    Bucket1("Bucket 1 (item_11)<br />~>Query.randomUserArray[]<br />⠀ROOT <-O- _12<br />⠀⠀username <-L- _13<br />⠀⠀gravatarUrl <-L- _14"):::bucket
    style Bucket1 stroke:#00bfff
    Bucket0 --> Bucket1
    end
```