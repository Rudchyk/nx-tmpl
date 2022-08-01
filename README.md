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
      "@{PROJECT}/components": [
        "apps/{PROJECT}/src/components/index.ts"
      ],
      "@{PROJECT}/layouts": [
        "apps/{PROJECT}/src/layouts/index.ts"
      ],
      "@{PROJECT}/modules": [
        "apps/{PROJECT}/src/modules/index.ts"
      ],
      "@{PROJECT}/pages": [
        "apps/{PROJECT}/src/pages/index.ts"
      ],
      "@{PROJECT}/templates": [
        "apps/{PROJECT}/src/templates/index.ts"
      ],
      "@{PROJECT}/hooks": [
        "apps/{PROJECT}/src/hooks/index.ts"
      ],
      "@{PROJECT}/utils": [
        "apps/{PROJECT}/src/utils/index.ts"
      ],
      "@{PROJECT}/forms": [
        "apps/{PROJECT}/src/forms/index.ts"
      ],
      "@{PROJECT}/store": [
        "apps/{PROJECT}/src/store/store.ts"
      ],
      "@{PROJECT}/reducers": [
        "apps/{PROJECT}/src/store/slices/index.ts"
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
      "@{PROJECT}/controllers": [
        "apps/{PROJECT}/src/controllers/index.ts"
      ],
      "@{PROJECT}/decorators": [
        "apps/{PROJECT}/src/decorators/index.ts"
      ],
      "@{PROJECT}/models": [
        "apps/{PROJECT}/src/models/index.ts"
      ],
      "@{PROJECT}/routes": [
        "apps/{PROJECT}/src/routes/index.ts"
      ],
      "@{PROJECT}/services": [
        "apps/{PROJECT}/src/services/index.ts"
      ],
      "@{PROJECT}/validators": [
        "apps/{PROJECT}/src/validators/index.ts"
      ],
      "@{PROJECT}/utils": [
        "apps/{PROJECT}/src/utils/index.ts"
      ],
      "@{PROJECT}/middlewares": [
        "apps/{PROJECT}/src/middlewares/index.ts"
      ]
    }
  }
}
```

### ./apps/{{PROJECT}}/tsconfig.json

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
