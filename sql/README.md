Modelo
======

Tablas Principales
==================

User (Usuario)
--------------
    id
    provider
    provider_id
    username
    password
    mail
    picture
    
Checkup (Chequeo)
-----------------
    id
    fork_from           -> Checkup.id (origin)
    status              -> open, closed, removed
    phase               -> Paso en el metodo: (Creacion-Ponderacion, Fuentes, Contexto, Calificacion)

Quote (Frase)
-------------
    id
    checkup_id
    text
    author              -> Entity.id ?
    where
    when
    category
    rate
        
Source (Fuente)
---------------
    id
    checkup_id
    source_entity_id    -> Entity.id
    type                -> origin, official, alternative  (P?)
    what
    checked
    observation

Context (Contexto)
------------------
    id
    checkup_id
    body
    tags

Rate (Calificacion)
-------------------
    id
    chekup_id
    user_id
    qualification       -> 100% verdadero, cualquiera, parcialmente verdadero, etc (P)
    score               -> Verdadero, Insostenible, Falso, etc (P)

Tablas Adicionales
====================

Checkup_User 
------------
    checkup_id
    user_id
    role_id             -> creator, collaborator
    
Entity (Entidad)
----------------
    id
    name
    description
    type                -> person, institute, agency, ngo, etc (P)

Entity_Relation
---------------
    entity_id_from
    entity_id_to
    type                -> belongs to, is a, etc (P)

Action
------
    made_by             -> user.id
    type                -> vote up, vote down, rate, follow, view, etc (P)
    on                  -> user.id|checkup.id|quote.id|source.id|post.id|input.id|comment.id

Input (Post/Aportes)
--------------------
    id
    input_type          -> quote, source, context 
    refers_to           -> quote.id, source.id, context.id
    text

Comments
--------
    id
    input_id
    text


Tablas Parametricas
===================

Source_type: origin, official, alternative

Entity_type: person, institute, agency, ngo, etc

Relation_type; belongs to, is a, etc 

Action_type: vote up, vote down, rate, follow, view, etc 

Qualification: 100% verdadero, cualquiera, parcialmente verdadero, etc
Score: Verdadero, Insostenible, Falso, etc


Campos Auditoría
==================
    created_by
    created

Campos Parametricas
===================
    id
    name
    description
