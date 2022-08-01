reactProject = react-showroom
nodeJsProject = api

react: structure-react redux sass libs-react libs-react-ui libs-svg extra-react

structure-react:
	mkdir -p apps/$(PROJECT)/src/components/lib && touch apps/$(PROJECT)/src/components/index.ts
	mkdir -p apps/$(PROJECT)/src/layouts/lib && touch apps/$(PROJECT)/src/layouts/index.ts
	mkdir -p apps/$(PROJECT)/src/modules/lib && touch apps/$(PROJECT)/src/modules/index.ts
	mkdir -p apps/$(PROJECT)/src/pages/lib && touch apps/$(PROJECT)/src/pages/index.ts
	mkdir -p apps/$(PROJECT)/src/templates/lib && touch apps/$(PROJECT)/src/templates/index.ts
	mkdir -p apps/$(PROJECT)/src/hooks/lib && touch apps/$(PROJECT)/src/hooks/index.ts
	mkdir -p apps/$(PROJECT)/src/utils/lib && touch apps/$(PROJECT)/src/utils/index.ts
	mkdir -p apps/$(PROJECT)/src/forms/lib && touch apps/$(PROJECT)/src/forms/index.ts
	touch apps/$(PROJECT)/.env.local
	touch apps/$(PROJECT)/.env

libs-react:
	yarn nx generate @nrwl/react:library customHooks --style=none --appProject=$(PROJECT) --importPath=@lib/customHooks --unitTestRunner=none --no-interactive
	yarn nx generate @nrwl/workspace:library --no-component --name=utils --no-interactive
	yarn nx generate @nrwl/workspace:library --name=$(PROJECT) --directory=interfaces --unitTestRunner=none --no-interactive
	yarn nx generate @nrwl/workspace:library --name=$(PROJECT) --directory=constants --unitTestRunner=none --no-interactive

libs-react-ui:
	yarn nx generate @nrwl/react:library --name=ui --appProject=$(PROJECT) --no-component --no-interactive
	yarn nx generate @nrwl/storybook:configuration --name=ui --uiFramework=@storybook/react --no-interactive

libs-svg:
	yarn nx generate @nrwl/workspace:library --name=svg --style=none --no-component --unitTestRunner=none --no-interactive

stylesPath = apps/$(PROJECT)/src/styles
stylesIndexPath = $(stylesPath)/index.scss
stylesVariablesPath = $(stylesPath)/lib/variables.scss
stylesMixinsPath = $(stylesPath)/lib/mixins.scss

sass:
	mkdir -p $(stylesPath)/lib
	touch $(stylesIndexPath) $(stylesVariablesPath) $(stylesMixinsPath)
	cat tools/tmpls/sass/index.tmpl >> $(stylesIndexPath)
	cat tools/tmpls/sass/variables.tmpl >> $(stylesVariablesPath)
	cat tools/tmpls/sass/mixins.tmpl >> $(stylesMixinsPath)

storePath = apps/$(PROJECT)/src/store
storeFilePath = $(storePath)/store.ts
reducersFilePath = $(storePath)/reducers.ts

redux:
	mkdir -p $(storePath)/slices/lib
	touch $(storeFilePath) $(reducersFilePath) $(storePath)/slices/index.ts
	cat tools/tmpls/redux/store.tmpl >> $(storeFilePath)
	cat tools/tmpls/redux/reducers.tmpl >> $(reducersFilePath)
	yarn add @reduxjs/toolkit redux-thunk redux react-redux

extra-react: react-other react-hook-form

react-hook-form:
	yarn add react-hook-form @hookform/resolvers yap

react-other:
	yarn add classnames

express: structure-express express-routes extra-express libs-express

express-setup:
	yarn add --dev @nrwl/express
	yarn nx g @nrwl/express:app api --frontendProject $(CLIENT)

structure-express:
	mkdir -p apps/$(PROJECT)/src/controllers/lib && touch apps/$(PROJECT)/src/controllers/index.ts
	mkdir -p apps/$(PROJECT)/src/decorators/lib && touch apps/$(PROJECT)/src/decorators/index.ts
	mkdir -p apps/$(PROJECT)/src/models/lib && touch apps/$(PROJECT)/src/models/index.ts
	mkdir -p apps/$(PROJECT)/src/services/lib && touch apps/$(PROJECT)/src/services/index.ts
	mkdir -p apps/$(PROJECT)/src/validators/lib && touch apps/$(PROJECT)/src/validators/index.ts
	mkdir -p apps/$(PROJECT)/src/utils/lib && touch apps/$(PROJECT)/src/utils/index.ts
	mkdir -p apps/$(PROJECT)/src/middlewares/lib && touch apps/$(PROJECT)/src/middlewares/index.ts
	touch apps/$(PROJECT)/.env.local
	touch apps/$(PROJECT)/.env

libs-express:
	yarn nx generate @nrwl/workspace:library --name=$(PROJECT) --directory=interfaces --unitTestRunner=none --no-interactive
	yarn nx generate @nrwl/workspace:library --name=$(PROJECT) --directory=constants --unitTestRunner=none --no-interactive

routesPath = apps/$(PROJECT)/src/routes
routerFilePath = $(storePath)/router.ts
routesIndexPath = $(storePath)/index.ts

express-routes:
	mkdir -p apps/$(PROJECT)/src/routes/lib
	touch apps/$(PROJECT)/src/routes/index.ts $(routerFilePath)
	cat tools/tmpls/express-routes/index.tmlp >> $(routesIndexPath)
	cat tools/tmpls/express-routes/router.tmpl >> $(routesIndexPath)

extra-express: express-other

express-other:
	yarn add cors

workspace: eslint prettier

eslint:
	yarn add eslint-plugin-jest eslint-plugin-prettier -D
	cat tools/tmpls/workspace/eslintrc.tmpl >> .eslintrc.json

prettier:
	cat tools/tmpls/workspace/prettier.tmpl >> .prettierrc

test:
	echo "Look at this variable: $(booo)"

# make ARGS="asdf" test
# make test ARGS="11111"
# make test PROJECT="client"