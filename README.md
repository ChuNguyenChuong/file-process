# Gevibiz project

## Structure

```
├───src
│   ├───assets <-> The item contains images and icons
│   │   ├───images  <-> images in the system
│   │   ├───icons <-> Icons in the system
│   ├───components <-> A place to store reusable components
│   ├───configs <-> Where to store configs of other libraries: axios, eg.
│   ├───enums
│   ├───helpers <-> where reusable functions are defined
│   ├───pages <-> where the pages of the system are defined, each file is a page
│   ├───store <-> Where to store global data in redux
│   └───types <-> where the common types for the system are defined
└───.env <-> Define environment variables
```

## Installation and runing

### use in docker

```
docker compose build
docker compose up
```

### run as development

```
yarn
yarn dev
```

### run as build

```
yarn
yarn build
yarn preview
```
