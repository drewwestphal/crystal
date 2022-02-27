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
    PgSelect_7[["PgSelect[_7∈0]<br /><forum_names>"]]:::plan
    Access_8["Access[_8∈0]<br /><_3.pgSettings>"]:::plan
    Access_9["Access[_9∈0]<br /><_3.withPgClient>"]:::plan
    Object_10["Object[_10∈0]<br /><{pgSettings,withPgClient}>"]:::plan
    __ListTransform_11["__ListTransform[_11∈0]<br /><each:_7>"]:::plan
    __Item_12>"__Item[_12∈1]<br /><_7>"]:::itemplan
    PgSelectSingle_13["PgSelectSingle[_13∈1]<br /><text>"]:::plan
    PgClassExpression_14["PgClassExpression[_14∈1]<br /><__forum_na...um_names__>"]:::plan
    __Item_15>"__Item[_15∈2]<br /><_11>"]:::itemplan
    PgSelectSingle_16["PgSelectSingle[_16∈2]<br /><text>"]:::plan
    PgClassExpression_17["PgClassExpression[_17∈2]<br /><__forum_na...um_names__>"]:::plan
    Lambda_18["Lambda[_18∈2]"]:::plan

    %% plan dependencies
    Object_10 --> PgSelect_7
    __Value_3 --> Access_8
    __Value_3 --> Access_9
    Access_8 --> Object_10
    Access_9 --> Object_10
    PgSelect_7 --> __ListTransform_11
    PgClassExpression_14 -.-> __ListTransform_11
    PgSelect_7 -.-> __Item_12
    __Item_12 --> PgSelectSingle_13
    PgSelectSingle_13 --> PgClassExpression_14
    __ListTransform_11 ==> __Item_15
    __Item_15 --> PgSelectSingle_16
    PgSelectSingle_16 --> PgClassExpression_17
    PgClassExpression_17 --> Lambda_18

    %% plan-to-path relationships
    P_0["~"]
    __Value_0 -.-> P_0
    P_11[">FORUM_NAMES"]
    __ListTransform_11 -.-> P_11
    P_14[">FORUM_NAMES@_11[]"]
    PgClassExpression_14 -.-> P_14
    P_18[">FORUM_NAMES[]"]
    Lambda_18 -.-> P_18

    %% allocate buckets
    classDef bucket0 stroke:#696969
    class __Value_0,__Value_3,PgSelect_7,Access_8,Access_9,Object_10,__ListTransform_11 bucket0
    classDef bucket1 stroke:#00bfff
    class __Item_12,PgSelectSingle_13,PgClassExpression_14 bucket1
    classDef bucket2 stroke:#7f007f
    class __Item_15,PgSelectSingle_16,PgClassExpression_17,Lambda_18 bucket2

    subgraph "Buckets for queries/functions/custom-query-forum-names-upper"
    Bucket0("Bucket 0 (root)<br />~<br />⠀ROOT <-O- _0<br />⠀⠀FORUM_NAMES <-L- _11"):::bucket
    style Bucket0 stroke:#696969
    Bucket1("Bucket 1 (item_12)"):::bucket
    style Bucket1 stroke:#00bfff
    Bucket0 --> Bucket1
    Bucket2("Bucket 2 (item_15)<br />~>Query.FORUM_NAMES[]<br />⠀ROOT <-O- _18"):::bucket
    style Bucket2 stroke:#7f007f
    Bucket0 --> Bucket2
    end
```