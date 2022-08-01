# Setup

```
yarn create nx-workspace --package-manager=yarn
```

## React

1. ./tsconfig.base.json

```
{
  ...,
  "compilerOptions": {
    ...,
    "paths": {
      "@project/components": [
        "apps/project/src/components/index.ts"
      ],
      "@project/layouts": [
        "apps/project/src/layouts/index.ts"
      ],
      "@project/modules": [
        "apps/project/src/modules/index.ts"
      ],
      "@project/pages": [
        "apps/project/src/pages/index.ts"
      ],
      "@project/templates": [
        "apps/project/src/templates/index.ts"
      ],
      "@project/hooks": [
        "apps/project/src/hooks/index.ts"
      ],
      "@project/utils": [
        "apps/project/src/utils/index.ts"
      ],
      "@project/forms": [
        "apps/project/src/forms/index.ts"
      ],
      "@project/store": [
        "apps/project/src/store/store.ts"
      ],
      "@project/reducers": [
        "apps/project/src/store/slices/index.ts"
      ]
    }
  }
}
```

## Express

1. ./tsconfig.base.json

```
{
  ...,
  "compilerOptions": {
    ...,
    "paths": {
      "@project/controllers": [
        "apps/project/src/controllers/index.ts"
      ],
      "@project/decorators": [
        "apps/project/src/decorators/index.ts"
      ],
      "@project/models": [
        "apps/project/src/models/index.ts"
      ],
      "@project/routes": [
        "apps/project/src/routes/index.ts"
      ],
      "@project/services": [
        "apps/project/src/services/index.ts"
      ],
      "@project/validators": [
        "apps/project/src/validators/index.ts"
      ],
      "@project/utils": [
        "apps/project/src/utils/index.ts"
      ],
      "@project/middlewares": [
        "apps/project/src/middlewares/index.ts"
      ]
    }
  }
}
```

### ./apps/{PROJECT}/tsconfig.json

```
{
  "compilerOptions": {
    ...,
    "noPropertyAccessFromIndexSignature": false,
  }
}
```

### SVG

index.ts

```
export { ReactComponent as PrinterSvg } from './lib/printer.svg';
```

### Helpers and tools

- [classnames](https://www.npmjs.com/package/classnames)
- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [React Timeout](https://github.com/plougsgaard/react-timeout)
- [React error boundary component](https://github.com/bvaughn/react-error-boundary)
- [react-i18next](https://react.i18next.com/)
- [React Feature Toggles](https://github.com/paralleldrive/react-feature-toggles)
- [mui](https://mui.com/)
