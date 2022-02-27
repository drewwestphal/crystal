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
    PgSelect_8[["PgSelect[_8∈0]<br /><entity_search>"]]:::plan
    __ListTransform_12["__ListTransform[_12∈0]<br /><each:_8>"]:::plan
    __Item_13>"__Item[_13∈1]<br /><_8>"]:::itemplan
    PgSelectSingle_14["PgSelectSingle[_14∈1]<br /><entity_search>"]:::plan
    __Item_15>"__Item[_15∈2]<br /><_12>"]:::itemplan
    PgSelectSingle_16["PgSelectSingle[_16∈2]<br /><entity_search>"]:::plan
    PgClassExpression_17["PgClassExpression[_17∈2]<br /><__entity_s...person_id”>"]:::plan
    PgClassExpression_18["PgClassExpression[_18∈2]<br /><__entity_s....”post_id”>"]:::plan
    PgClassExpression_19["PgClassExpression[_19∈2]<br /><__entity_s...omment_id”>"]:::plan
    List_20["List[_20∈2]<br /><_17,_18,_19>"]:::plan
    PgPolymorphic_21["PgPolymorphic[_21∈2]"]:::plan
    First_26["First[_26∈2]"]:::plan
    PgSelectSingle_27["PgSelectSingle[_27∈3]<br /><people>"]:::plan
    PgClassExpression_28["PgClassExpression[_28∈3]<br /><__people__.”person_id”>"]:::plan
    PgClassExpression_29["PgClassExpression[_29∈3]<br /><__people__.”username”>"]:::plan
    First_34["First[_34∈2]"]:::plan
    PgSelectSingle_35["PgSelectSingle[_35∈4]<br /><posts>"]:::plan
    PgClassExpression_36["PgClassExpression[_36∈4]<br /><__posts__.”post_id”>"]:::plan
    First_42["First[_42∈4]"]:::plan
    PgSelectSingle_43["PgSelectSingle[_43∈4]<br /><people>"]:::plan
    PgClassExpression_44["PgClassExpression[_44∈4]<br /><__people__.”username”>"]:::plan
    PgClassExpression_45["PgClassExpression[_45∈4]<br /><__posts__.”body”>"]:::plan
    First_50["First[_50∈2]"]:::plan
    PgSelectSingle_51["PgSelectSingle[_51∈5]<br /><comments>"]:::plan
    PgClassExpression_52["PgClassExpression[_52∈5]<br /><__comments...omment_id”>"]:::plan
    First_58["First[_58∈5]"]:::plan
    PgSelectSingle_59["PgSelectSingle[_59∈5]<br /><people>"]:::plan
    PgClassExpression_60["PgClassExpression[_60∈5]<br /><__people__.”username”>"]:::plan
    Access_63["Access[_63∈0]<br /><_3.pgSettings>"]:::plan
    Access_64["Access[_64∈0]<br /><_3.withPgClient>"]:::plan
    Object_65["Object[_65∈0]<br /><{pgSettings,withPgClient}>"]:::plan
    First_66["First[_66∈5]"]:::plan
    PgSelectSingle_67["PgSelectSingle[_67∈5]<br /><posts>"]:::plan
    PgClassExpression_68["PgClassExpression[_68∈5]<br /><__posts__.”post_id”>"]:::plan
    PgClassExpression_69["PgClassExpression[_69∈5]<br /><__posts__.”body”>"]:::plan
    PgClassExpression_70["PgClassExpression[_70∈5]<br /><__comments__.”body”>"]:::plan
    Map_71["Map[_71∈2]<br /><_16:{”0”:0,”1”:1}>"]:::plan
    List_72["List[_72∈2]<br /><_71>"]:::plan
    Map_73["Map[_73∈4]<br /><_35:{”0”:1}>"]:::plan
    List_74["List[_74∈4]<br /><_73>"]:::plan
    Map_75["Map[_75∈2]<br /><_16:{”0”:3,”1”:4,”2”:5}>"]:::plan
    List_76["List[_76∈2]<br /><_75>"]:::plan
    Map_77["Map[_77∈5]<br /><_51:{”0”:1}>"]:::plan
    List_78["List[_78∈5]<br /><_77>"]:::plan
    Map_79["Map[_79∈5]<br /><_51:{”0”:2,”1”:3}>"]:::plan
    List_80["List[_80∈5]<br /><_79>"]:::plan
    Map_81["Map[_81∈2]<br /><_16:{”0”:7,”1”:8,”2”:9,”3”:10,”4”:11}>"]:::plan
    List_82["List[_82∈2]<br /><_81>"]:::plan

    %% plan dependencies
    Object_65 --> PgSelect_8
    InputStaticLeaf_7 --> PgSelect_8
    PgSelect_8 --> __ListTransform_12
    PgSelectSingle_14 -.-> __ListTransform_12
    PgSelect_8 -.-> __Item_13
    __Item_13 --> PgSelectSingle_14
    __ListTransform_12 ==> __Item_15
    __Item_15 --> PgSelectSingle_16
    PgSelectSingle_16 --> PgClassExpression_17
    PgSelectSingle_16 --> PgClassExpression_18
    PgSelectSingle_16 --> PgClassExpression_19
    PgClassExpression_17 --> List_20
    PgClassExpression_18 --> List_20
    PgClassExpression_19 --> List_20
    PgSelectSingle_16 --> PgPolymorphic_21
    List_20 --> PgPolymorphic_21
    List_72 --> First_26
    First_26 --> PgSelectSingle_27
    PgSelectSingle_27 --> PgClassExpression_28
    PgSelectSingle_27 --> PgClassExpression_29
    List_76 --> First_34
    First_34 --> PgSelectSingle_35
    PgSelectSingle_35 --> PgClassExpression_36
    List_74 --> First_42
    First_42 --> PgSelectSingle_43
    PgSelectSingle_43 --> PgClassExpression_44
    PgSelectSingle_35 --> PgClassExpression_45
    List_82 --> First_50
    First_50 --> PgSelectSingle_51
    PgSelectSingle_51 --> PgClassExpression_52
    List_78 --> First_58
    First_58 --> PgSelectSingle_59
    PgSelectSingle_59 --> PgClassExpression_60
    __Value_3 --> Access_63
    __Value_3 --> Access_64
    Access_63 --> Object_65
    Access_64 --> Object_65
    List_80 --> First_66
    First_66 --> PgSelectSingle_67
    PgSelectSingle_67 --> PgClassExpression_68
    PgSelectSingle_67 --> PgClassExpression_69
    PgSelectSingle_51 --> PgClassExpression_70
    PgSelectSingle_16 --> Map_71
    Map_71 --> List_72
    PgSelectSingle_35 --> Map_73
    Map_73 --> List_74
    PgSelectSingle_16 --> Map_75
    Map_75 --> List_76
    PgSelectSingle_51 --> Map_77
    Map_77 --> List_78
    PgSelectSingle_51 --> Map_79
    Map_79 --> List_80
    PgSelectSingle_16 --> Map_81
    Map_81 --> List_82

    %% plan-to-path relationships
    P_0["~"]
    __Value_0 -.-> P_0
    P_12[">searchEntities"]
    __ListTransform_12 -.-> P_12
    P_14[">searchEntities@_12[]"]
    PgSelectSingle_14 -.-> P_14
    P_21[">searchEntities[]"]
    PgPolymorphic_21 -.-> P_21
    P_28[">s…]>personId"]
    PgClassExpression_28 -.-> P_28
    P_29[">s…]>username"]
    PgClassExpression_29 -.-> P_29
    P_36[">s…]>postId"]
    PgClassExpression_36 -.-> P_36
    P_43[">s…]>author"]
    PgSelectSingle_43 -.-> P_43
    P_44[">s…]>a…r>username"]
    PgClassExpression_44 -.-> P_44
    P_45[">s…]>body"]
    PgClassExpression_45 -.-> P_45
    P_52[">s…]>commentId"]
    PgClassExpression_52 -.-> P_52
    P_59[">s…]>author"]
    PgSelectSingle_59 -.-> P_59
    P_60[">s…]>a…r>username"]
    PgClassExpression_60 -.-> P_60
    P_67[">s…]>post"]
    PgSelectSingle_67 -.-> P_67
    P_68[">s…]>post>postId"]
    PgClassExpression_68 -.-> P_68
    P_69[">s…]>post>body"]
    PgClassExpression_69 -.-> P_69
    P_70[">s…]>body"]
    PgClassExpression_70 -.-> P_70

    %% allocate buckets
    classDef bucket0 stroke:#696969
    class __Value_0,__Value_3,InputStaticLeaf_7,PgSelect_8,__ListTransform_12,Access_63,Access_64,Object_65 bucket0
    classDef bucket1 stroke:#00bfff
    class __Item_13,PgSelectSingle_14 bucket1
    classDef bucket2 stroke:#7f007f
    class __Item_15,PgSelectSingle_16,PgClassExpression_17,PgClassExpression_18,PgClassExpression_19,List_20,PgPolymorphic_21,First_26,First_34,First_50,Map_71,List_72,Map_75,List_76,Map_81,List_82 bucket2
    classDef bucket3 stroke:#ffa500
    class PgSelectSingle_27,PgClassExpression_28,PgClassExpression_29 bucket3
    classDef bucket4 stroke:#0000ff
    class PgSelectSingle_35,PgClassExpression_36,First_42,PgSelectSingle_43,PgClassExpression_44,PgClassExpression_45,Map_73,List_74 bucket4
    classDef bucket5 stroke:#7fff00
    class PgSelectSingle_51,PgClassExpression_52,First_58,PgSelectSingle_59,PgClassExpression_60,First_66,PgSelectSingle_67,PgClassExpression_68,PgClassExpression_69,PgClassExpression_70,Map_77,List_78,Map_79,List_80 bucket5

    subgraph "Buckets for queries/unions-search-entities/search"
    Bucket0("Bucket 0 (root)<br />~<br />⠀ROOT <-O- _0<br />⠀⠀searchEntities <-A- _12"):::bucket
    style Bucket0 stroke:#696969
    Bucket1("Bucket 1 (item_13)"):::bucket
    style Bucket1 stroke:#00bfff
    Bucket0 --> Bucket1
    Bucket2("Bucket 2 (item_15)<br />~>Query.searchEntities[]<br />⠀ROOT <-O- _21"):::bucket
    style Bucket2 stroke:#7f007f
    Bucket0 --> Bucket2
    Bucket3("Bucket 3 (polymorphic_21[Person])<br />~>Query.searchEntities[]<br />⠀⠀personId <-L- _28<br />⠀⠀username <-L- _29"):::bucket
    style Bucket3 stroke:#ffa500
    Bucket2 --> Bucket3
    Bucket4("Bucket 4 (polymorphic_21[Post])<br />~>Query.searchEntities[]<br />⠀⠀postId <-L- _36<br />⠀⠀author <-O- _43<br />⠀⠀⠀author.username <-L- _44<br />⠀⠀body <-L- _45"):::bucket
    style Bucket4 stroke:#0000ff
    Bucket2 --> Bucket4
    Bucket5("Bucket 5 (polymorphic_21[Comment])<br />~>Query.searchEntities[]<br />⠀⠀commentId <-L- _52<br />⠀⠀author <-O- _59<br />⠀⠀⠀author.username <-L- _60<br />⠀⠀post <-O- _67<br />⠀⠀⠀post.postId <-L- _68<br />⠀⠀⠀post.body <-L- _69<br />⠀⠀body <-L- _70"):::bucket
    style Bucket5 stroke:#7fff00
    Bucket2 --> Bucket5
    end
```