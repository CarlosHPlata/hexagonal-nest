## Description

This is the base project for every microservice project, based on NestJS, for the Vendors Squad.

On this repo you will also find code examples for common implementations. explore the branches to research about the different code examples.

**Don't forget to create your own `.env` based on the `.env.example`**

## Running the app Locally

```bash
# install before start
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app on a container

`.env.example` has the adecuate environment variables to run perfectly on container

```bash
docker-compose up --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Enter to Swagger documentation

```
localhost:3003/api/
```

## Folder Structure

Based on the [hexagonal architecture (see Architecture
Principles)](Architecture_Principles 'wikilink'), we will use the next
folders:

```md
+-- src
| +-- core
| +-- infrastructure
| +-- modules
| +-- moduleNameFolder
| +-- core
| +-- dto
| +-- entities
| +-- interfaces
| +-- repositories
| +-- ports
| +-- services
|
| +-- infrastructure
| +-- controllers
| +-- repositories
| +-- ports
|
| moduleName.module.ts
|
| +-- otherModuleFolder
...
```

## Commit conventional

You need to know that the base project has installed commit conventional so, each commit has to follow a certain set of rules in order to be actually commited into the repository.

see: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Supported prefixes are:

```
+-- feat
+-- fix
+-- chore
+-- docs
+-- style
+-- refactor
+-- perf
+-- test
```

## Architecture principles

The purpose of this page is to make emphasis and expose the motivations
and goals behind the chosen Software Architecture used by turbo.
In this readme are presented some of the techniques, best practices,
architectural patterns, and guidelines followed gathered by the team.

This readme does not have the goal of teaching how to build and create a
project from scratch, rather this readme will provide you with all the technicity and knowledge
which inspired the architecture behind the code of turbo.

Code examples are written using TypeScript.

## Clean Architecture

Clean Architecture is a software
design philosophy that separates the elements of a design into levels of
abstraction. The most important goal of Clean Architecture is to provide
the developers with a way to organize code in such a way that it
encapsulates the **business logic** from the **technical
implementations** (<u>like framework dependencies, database
implementation</u>).

![clean architecture](https://teamsmiley.github.io/assets/clean-architecture-dotnet.png)
When looking at the diagram, we can see multiple layers of an
Application, which the Domain and Application layers are the core of our
application, and the Infrastructure and Framework layers are the the
external layers of our application.

- **The Core (<u>Domain and Application)</u> encapsulates our business
  logic, here is where all the logic of our application lives.**
- **The External Layer (<u>Infrastructure and Blue Layer</u>)
  encapsulates the technical adaptation for our application**

The key behind this separation is to isolate the technical
implementations from the real logic used by the application to work, so
in case your application needs to change the framework, the database,

The main rule of Clean Architecture is that: **Code dependencies can
only move from the outer layers inward.** Code on the inner layers
should have no knowledge of function of the outer layers. For example,
Domain should know nothing about what is in the Application Layer.

- **Framework/ DB/ UI / External Systems:** This layer is the most
  outer layer, it represents the technologies that govern over the
  access of our application, such as the Framework used, the DB
  implemented, or if it's HTTP or CL iteration to our code, this layer
  is out of the control of the Developer, and it just represent the
  technology decision made by the project.
- **Infrastructure:** This layer represents all the technical
  implementations that our application should implement and are tied
  to the technologies we decide in the previous layer. For example:
  _the controllers of an HTTP Framework, the Components from Angular,
  the ORM implementation of a DB Connection._ This layer also contains
  the technical definition of contracts (interfaces) defined in the
  core which manage the connections from the inner layers to the
  external layers (see more below).
- **Application:** The application layer is the first abstraction of
  our business Logic Core, here we define the Uses Cases and all the
  actions we can perform on our system. Here you can define interface
  adapters from outer libraries to the use in the core.
- **Domain:** The most inner layer of our application, here are
  defined the Object abstraction we use in our business Logic to
  operate over (<u>The entities</u>). Here are also defined the
  contracts to access to the entities data and the mappers to
  transform Data Structures to Entities.

### Hexagonal Architecture

![Hexagonal Architecture](https://miro.medium.com/max/1400/1*yR4C1B-YfMh5zqpbHzTyag.png)

The hexagonal architecture, or ports
and adapters architecture, is an architectural pattern used in software
design, it's a more simpler implementation of Clean Architecture.

The hexagonal architecture divides a system into several loosely-coupled
layers. This approach is an alternative to the traditional layered
architecture.

The core is connected to the infrastructure layer through a number of
exposed "ports". Communication through these ports follow a given
contract depending on their purpose. Ports and contracts define an
abstract API[1](https://en.wikipedia.org/wiki/API) <u>(do not get
confused with a REST API)</u> that can be implemented by any suitable
technical means.

### Pros:

- Independent of external frameworks, technologies, databases, etc.
  Frameworks and external resources can be plugged/unplugged with much
  less effort.
- Easily testable and scalable.
- More secure.
- The solution can be worked on and maintained by different teams,
  with out stepping on each other's toes.
- Easier to add new features. As the system grows over time, the
  difficulty in adding new features remains constant and relatively
  small.
- If the solution is properly broken apart along bounded context
  lines, it becomes easy to convert pieces of it into microservices if
  needed.

### Cons

- This is a sophisticated architecture and not well documented, which
  requires a firm understanding of quality software principles.
- Some of the practices presented are not recommended for small sized
  applications with not a lot of business logic.

![Hexagonal diagram](https://miro.medium.com/max/1400/0*Rg4n-AdiSBwJaTJR.png)

## Diagram

In short, data flow looks like this (from left to right):

- Request is sent too the controller using plain DTO
- Controller parses this DTO and maps it to an Entity format.
- Then Controller handle's Command/Query Request using the Application
  Services. It executes business logic using the entities and uses the
  infrastructure layer through ports.
- Infrastructure layer uses a mapper to convert data to format that it
  needs, uses repositories to fetch/persist data and adapters to send
  events or do other communications, maps data back to domain format
  and returns it back to the Application Service.
- After application service finishes doing it's job, it returns
  data/confirmation back to Controllers.
- Controllers return data back to the user.

Each layer is in charge of it's own logic and has building blocks that
usually should follow a Single-Responsibility
principle[2](https://es.wikipedia.org/wiki/Principio_de_responsabilidad_%C3%BAnica)
when possible and when it makes sense (for example, using Repositories
only for database access, using Entities for business logic etc.).

Keep in mind that different projects can have more or less
steps/layers/building blocks, than described here. Add more if your
application requires it, and skip some if application is not that
complex and doesn't need all that abstraction.

General recommendation for any project: analyze how big or complex the
application will be, find a compromise and use as many layers as needed
for the project and skip ones that may over-complicate things.

## Modules

In turbo we divide the clean architecture by Modules. Each
module gets its own folder with a dedicated codebase, contained itself
his own clean architecture environment.

It is easier to work on things that change together if those things are
gathered relatively close to each other. Try not to create dependencies
between modules or use cases, move shared logic into a separate files
and make both depend on that instead of depending on each other.

Try to make every module independent and keep interactions between
modules minimal. Think of each module as a mini application bounded by a
single context. Try to avoid direct imports between modules (like
importing a service from other domain) since this creates tight
coupling[3](<https://en.wikipedia.org/wiki/Coupling_(computer_programming)>).
Communication between modules can be done using events, public
interfaces or through a port/adapter/repository (more on that topic
below).

This approach ensures loose
coupling[4](https://en.wikipedia.org/wiki/Loose_coupling), and, if
bounded contexts are defined and designed properly, each module can be
easily separated into a microservice if needed without touching any
domain logic.

Each Module core is separated as represented below:

## Application Core

The application core is represented by the first two layers of Hexagonal
Architecture (Application and Domain Layer)

**Domain layer:**

- DTO
- Entities
- Mappers
- Repositories interfaces

**Application layer:**

- Ports and Adapters interfaces
- Application Services or Use Cases

### Entities

Entities are the core of the domain. They encapsulate Enterprise wide
business rules and attributes. An entity can be an object with
properties and methods, or it can be a set of data structures and
functions. Entities represent business models and express what
properties a particular model has, what it can do, when and at what
conditions it can do it. An example of business model can be a User,
Product, Booking, Ticket, Wallet etc.

**Domain entities should always be valid entities**. There are a certain
number of invariants[5](https://en.wikipedia.org/wiki/Class_invariant)
for an object that should always be true. For example, an order item
object always has to have a quantity that must be a positive integer,
plus an article name and price. Therefore, invariants enforcement is the
responsibility of the domain entities and **an entity object should not
be able to exist without being valid**.

A lot of people tend to create one module per entity, but this approach
is not very good. Each module may have multiple entities. One thing to
keep in mind is that putting entities in a single module requires those
entities to have related business logic, don't group unrelated entities
in one module.

### DTOs

DTO or Data Transfer
Objects[6](https://es.wikipedia.org/wiki/Objeto_de_transferencia_de_datos)
are data structures, often represented by Classes without methods or
typescript interfaces, they are used to transfer data between
repositories, adapters, and ports, **<u>they are not Entities</u>**, so
they can be different completely from Entities, this data structures are
just used to transfer information between modules.

- Have no identity. Equality is determined through structural
  property.
- Are immutable.
- Can be used as an attribute of `entities` and other `DTO`.
- Explicitly defines and enforces important constraints (invariants).

### Mappers

Used to map some DTOS to Entities through mappers, it can map several
DTO through mappers, this can be changed using libraries if needed as if
they are not invasive.

### Repositories interfaces

We use repositories to decouple the infrastructure or technology used to
access entities storage (database, cache, other services which provide
entities) from the domain model layer. Repositories centralize common
data access functionality. They encapsulate the logic required to access
that data. Entities can be put into a repository and then retrieved at a
later time without domain even knowing where data is saved, in a
database, or a file, or some other source.

In this case **<u>we only set the interfaces not the
implementations,</u>** implementations are set on the Infrastructure
layer.

_Martin Fowler_ describes a repository as follows:

> A repository performs the tasks of an intermediary between the domain
> model layers and data mapping, acting in a similar way to a set of
> domain objects in memory. Client objects declaratively build queries
> and send them to the repositories for answers. Conceptually, a
> repository encapsulates a set of objects stored in the database and
> operations that can be performed on them, providing a way that is
> closer to the persistence layer. Repositories, also, support the
> purpose of separating, clearly and in one direction, the dependency
> between the work domain and the data allocation or mapping.

### Application Services or Use Cases

Are also called "**Workflow Services**", "**Use Cases**",
"**Interactors**" etc. These services orchestrate the steps required to
fulfill the commands imposed by the client.

- Typically used to orchestrate how the outside world interacts with
  your application and performs tasks required by the end users.
- Services are used for "a significant process or transformation in
  the domain that is not a natural responsibility of an ENTITY or DTO
- Services declare dependencies on infrastructural services required
  to execute domain logic (by using ports, adapters or repositories)
  by using dependency injection or factories from the infrastructure
  layer.
- In case of interacting with one Entity, executes its methods
  directly.
- In case of working with multiple Entities, uses the methods to
  orchestrate them.

### Ports and Adapter interfaces

Ports and Adapters are interfaces that define contracts which must be
implemented by infrastructure in order to execute some action more
related to technology details rather than business logic. Ports and
Adapters act like abstractions for technology details that business
logic does not care about.

**<u>We only set the interfaces not the implementations,</u>**
implementations are set on the Infrastructure layer.

- Ports are tied to communication between services, events, or other
  modules
- Adapters are contracts to communicate to some intrusive libraries to
  encapsulate their behavior outside of the Application core.

## Application Infrastructure

The last layer of the Hexagonal Architecture will vary, since is the
representation of the technical implementation, the structure of this
will change to implement the structure of the language, framework or
library that you are using.

The only necessary things defined here are:

- Repositories implementations
- Ports and Adapters implementations
- Persistence Models
- Framework logic

### Persistence Models

**Using a single entity for domain logic and database concerns leads to
a database-centric architecture**. In DDD world domain model and
persistence model should be separated.

Since domain `Entities` have their data modeled so that it best
accommodates domain logic, it may be not in the best shape to save in a
database. For that purpose `Persistence models` can be created that have
a shape that is better represented in a particular database that is
used. Domain layer should not know anything about persistence models,
and it should not care.

Over time, when the amount of data grows, there may be a need to make
some changes in the database like improving performance or data
integrity by re-designing some tables or even changing the database
entirely. Without an explicit separation between `Domain` and
`Persistence` models any change to the database will lead to change in
your domain `Entities.`

### Repositories Implementations

The data flow here looks something like this: repository receives a
domain `Entity` from application service, maps it to database schema/ORM
format, does required operations and maps it back to domain `Entity` and
returns it back to service.

Keep in mind that application's core is not allowed to depend on
repositories directly, instead it depends on abstractions. This makes
data retrieval technology-agnostic.

### Ports and Adapters implementations

In Application Core dependencies point inwards. Outer layers can depend
on inner layers, but inner layers never depend on outer layers.
Application Core shouldn't depend on frameworks or access external
resources directly. Any external calls to out-of-process
resources/retrieval of data from remote processes should be done through
`ports and adapters` (interfaces), with class implementations created
somewhere in infrastructure layer and injected into application's core
[Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection#)
and Dependency
Inversion[7](https://en.wikipedia.org/wiki/Dependency_inversion_principle)).

## Error Handler

### Exception types

Consider extending `Error` object to make custom exception types for
different situations. For example: `DomainException` etc. This is
especially relevant in NodeJS world since there is no exceptions for
different situations by default.

Keep in mind that application's `core` shouldn't throw HTTP exceptions
or statuses since it shouldn't know in what context it is used, since it
can be used by anything: HTTP controller, Microservice event handler,
Command Line Interface etc.

When used in HTTP context, for returning proper status code back to user
an `instanceof` check can be performed in exception interceptor or in a
controller and appropriate HTTP exception can be returned depending on
exception type.

Adding a `name` string with type name for every exception is a good
practice, since when that exception is transferred to another process
`instanceof` check cannot be performed anymore so a `name` string is
used instead. Exception `name` enum types can be stored in a separate
file so they can be reused on a receiving side like: exception.types.ts.

### Differentiate between programmer errors and operational errors

**Application should be protected not only from operational errors (like
incorrect user input), but from a programmer errors** as well by
throwing exceptions when something is not used as intended.

For example:

- Operational errors can happen when validation error is thrown by
  validating user input, it means that input body is incorrect and a
  `400 Bad Request` exception should be returned to the user with
  details of what fields are incorrect (notification pattern). In this
  case user can fix the input body and retry the request.
- On the other hand, programmer error means something unexpected
  occurs in the program. For example, when exception happens on a new
  domain object creation, sometimes it can mean that a class is not
  used as intended and some rule is violated, for example a programmer
  did a mistake by assigning an incorrect value to a constructor, or
  value got mutated at some point and is no longer valid. In this case
  user cannot do anything to fix this, only a programmer can, so it
  may be more appropriate to throw a different type of exception that
  should be logged and then returned to the user as `500 Internal Server Error`, in this case without adding much additional details
  to the response since it may cause a leak of some sensitive data.

### Error Serialization

By default, in NodeJS Error objects serialize to JSON with output like
this:

```js
{
  name: 'ValidationError';
}
```

Consider serializing errors by creating a `toJSON()` method so it can be
easily sent to other processes as a plain object.

## Using libraries inside Application Core

Whether or not to use libraries in application layer and especially
domain layer is a subject of a lot of debates. In real world, injecting
every library instead of importing it directly is not always practical,
so exceptions can be made for some single responsibility libraries that
help to implement domain logic (like working with numbers).

Main recommendations to keep in mind is that libraries imported in
application's core shouldn't expose:

- Functionality to access any out-of-process resources (http calls,
  database access etc.);
- Functionality not relevant to domain (frameworks, technology details
  like ORMs, Logger etc.).
- Functionality that brings randomness (generating random IDs,
  timestamps etc.) since this makes tests unpredictable (though in
  TypeScript world it is not that big of a deal since this can be
  mocked by a test library without using DI);
- Frameworks can be a real nuisance because by definition they want to
  be in control. Isolate them within the adapters and keep our domain
  model clean of them.
- If a library changes often or has a lot of dependencies of its own
  it most likely shouldn't be used in domain layer.

## Bibliography

- Clean Code
- Clean Architecture
- [Hexagonal
  Architecture](<wikipedia:Hexagonal_architecture_(software)> 'wikilink')
- [Modular programming: Beyond the spaghetti
  mess](https://www.tiny.cloud/blog/modular-programming-principle/)
- [Domain Driven Hexagon
  Repository](https://github.com/Sairyss/domain-driven-hexagon)
- [Domain Entity
  Pattern](https://badia-kharroubi.gitbooks.io/microservices-architecture/content/patterns/tactical-patterns/domain-entity-pattern.html)
-
