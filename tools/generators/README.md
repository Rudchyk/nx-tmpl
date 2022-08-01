## ZIP generators

- `"C:/Program Files/7-Zip/7z.exe" a tools/generators.zip ./tools/generators/*`
- `"C:/Program Files/7-Zip/7z.exe" a tools/generators/element.zip ./tools/generators/element/*`
- `"C:/Program Files/7-Zip/7z.exe" a tools/generators/redux.zip ./tools/generators/redux/*`

## Generators

1. `curl -L https://github.com/Rudchyk/nx-tmpl/raw/main/tools/generators.zip -o ./tools/generators.zip`
2. `"C:/Program Files/7-Zip/7z.exe" x tools/generators.zip -oC:/playground/nx-tmpl/tools/generators`
3. `rm -rf tools/generators.zip`

### redux

1. `curl -L https://github.com/Rudchyk/nx-tmpl/raw/main/tools/generators/redux.zip -o ./tools/generators/redux.zip`
2. `"C:/Program Files/7-Zip/7z.exe" x tools/generators/redux.zip -oC:/playground/nx-tmpl/tools/generators/redux`
3. `rm -rf tools/generators/redux.zip`

### element

1. `curl -L https://github.com/Rudchyk/nx-tmpl/raw/main/tools/generators/element.zip -o ./tools/generators/element.zip`
2. `"C:/Program Files/7-Zip/7z.exe" x tools/generators/element.zip -oC:/playground/nx-tmpl/tools/generators/element`
3. `rm -rf tools/generators/element.zip`
