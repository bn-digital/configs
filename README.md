# BN Digital Coding Standards

--- 

## Core principles

### Simplicity

- No deep hierarchy
- Grouping by type
- Layers separation

```
src/
..components/       # contains all reusable components and UI-kit overrides
..pages/            # contains all routes, splitted by uri
....contacts/       # name reflects uri, one directory per page 
......index.tsx     # each component has index.tsx with default export
....index.tsx
..contexts/
```

### Consistency

- File & directory naming convention
    - React Components related file(s) (`tsx`, `less`, `test.ts`, `spec.ts`, `stories.tsx` etc) reflect component name - **`PascalCase`**:
      
      `components/button/Button.tsx`:

      ```typescript
      import { FC } from 'react'
      import './Button.less'
      
      type ButtonType = 'primary' | 'default'
      
      type ButtonProps = { type: ButtonType }
      
      const Button: FC<Partial<ButtonProps>> = ({ type = 'default', children, ...props }) => {
        return <button className={`button button-${type}`}>{children}</button>
      }
      
      export { Button }
      ``` 
      
      `components/button/Button.less`:
      
      ```less
      @button-bg-default: #fafafa;
      @button-bg-primary: #578e0e;
      
      .button {
        display: block;
        width: 200px;
      
        &-default {
          background-color: @button-bg-default;
        }
        
        &-primary {
          background-color: @button-bg-primary;
        }
      
      } 
      ```

### Predictability

- Follow UI kit naming

```
src/
..components/
....card/
......UserCard.tsx  
......UserCard.less  
......OrganizationCard.tsx
......OrganizationCard.less
......index.tsx                 # export { UserCard, OrganizationCard } 
```

## ESLint

> Use [organization's preset](packages/eslint-config) as base. 

## Prettier
