.SILENT:clean

CLIENT = $(if $(c),$(c),client)
API = $(if $(a),$(a),api)
REACT_CUSTOM_HOOKS = react-custom-hooks
UTILS = utils
INTERFACES = interfaces
CONSTANTS = constants
UI = ui

react: react-clean react-structure react-libs react-ui-libs svg-libs sass redux react-extra

react-clean:
	yarn nx generate @nrwl/workspace:remove $(CLIENT)-e2e --no-interactive

react-structure:
	mkdir -p apps/$(CLIENT)/src/components/lib && touch apps/$(CLIENT)/src/components/index.ts
	mkdir -p apps/$(CLIENT)/src/hooks/lib && touch apps/$(CLIENT)/src/hooks/index.ts
	mkdir -p apps/$(CLIENT)/src/layouts/lib && touch apps/$(CLIENT)/src/layouts/index.ts
	mkdir -p apps/$(CLIENT)/src/modules/lib && touch apps/$(CLIENT)/src/modules/index.ts
	mkdir -p apps/$(CLIENT)/src/pages/lib && touch apps/$(CLIENT)/src/pages/index.ts
	mkdir -p apps/$(CLIENT)/src/plagins
	mkdir -p apps/$(CLIENT)/src/providers/lib && touch apps/$(CLIENT)/src/providers/index.ts
	mkdir -p apps/$(CLIENT)/src/services/lib && touch apps/$(CLIENT)/src/services/index.ts
	mkdir -p apps/$(CLIENT)/src/templates/lib && touch apps/$(CLIENT)/src/templates/index.ts
	mkdir -p apps/$(CLIENT)/src/utils/lib && touch apps/$(CLIENT)/src/utils/index.ts
	touch apps/$(CLIENT)/robots.txt
	touch apps/$(CLIENT)/.env.local
	touch apps/$(CLIENT)/.env
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/express-structure/alias.json p=$(CLIENT)

react-libs:
	yarn nx generate @nrwl/react:library $(REACT_CUSTOM_HOOKS) --style=none --appCLIENT=$(CLIENT) --importPath=@lib/hooks --unitTestRunner=none --no-interactive --no-component
	mkdir -p libs/$(REACT_CUSTOM_HOOKS)/src/lib && touch libs/$(REACT_CUSTOM_HOOKS)/src/index.ts
	yarn nx generate @nrwl/workspace:library --name=$(CLIENT) --no-component --directory=$(INTERFACES) --importPath=@$(CLIENT)/$(INTERFACES) --unitTestRunner=none --no-interactive
	mkdir -p libs/$(INTERFACES)/$(CLIENT)/src/lib && touch libs/$(INTERFACES)/$(CLIENT)/src/index.ts
	yarn nx generate @nrwl/workspace:library --name=$(CLIENT) --no-component --directory=$(CONSTANTS) --importPath=@$(CLIENT)/$(CONSTANTS) --unitTestRunner=none --no-interactive
	mkdir -p libs/$(CONSTANTS)/$(CLIENT)/src/lib && touch libs/$(CONSTANTS)/$(CLIENT)/src/index.ts

react-ui-libs:
	yarn nx generate @nrwl/react:library --name=$(UI) --importPath=@$(UI) --appCLIENT=$(CLIENT) --no-component --no-interactive
	mkdir -p libs/$(UI)/src/lib && touch libs/$(UI)/src/index.ts
	yarn nx generate @nrwl/storybook:configuration --name=$(UI) --uiFramework=@storybook/react --no-interactive
	yarn nx generate @nrwl/workspace:remove $(UI)-e2e --no-interactive

react-extra:
	yarn add classnames

SVG = svg

react-hook-form:
	yarn add react-hook-form @hookform/resolvers yap
	mkdir -p apps/$(CLIENT)/src/forms/lib && touch apps/$(CLIENT)/src/forms/index.ts
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/react-hook-form/alias.json p=$(CLIENT)

svg-libs:
	yarn nx generate @nrwl/workspace:library --name=$(SVG) --importPath=@$(SVG) --style=none --no-component --unitTestRunner=none --no-interactive
	mkdir libs/$(SVG)/src/lib && touch libs/$(SVG)/src/index.ts

STYLES_PATH = apps/$(CLIENT)/src/styles
STYLES_INDEX_PATH = $(STYLES_PATH)/index.scss
STYLES_VARIABLES_PATH = $(STYLES_PATH)/lib/variables.scss
STYLES_MIXINS_PATH = $(STYLES_PATH)/lib/mixins.scss

sass:
	mkdir -p $(STYLES_PATH)/lib
	touch $(STYLES_INDEX_PATH) $(STYLES_VARIABLES_PATH) $(STYLES_MIXINS_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/sass/index.tmpl --silent >> $(STYLES_INDEX_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/sass/variables.tmpl --silent >> $(STYLES_VARIABLES_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/sass/mixins.tmpl --silent >> $(STYLES_MIXINS_PATH)
	yarn add sass-resources-loader -D
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/apps/client/webpack.config.js --silent >> $(WEBPACK_CONFIG_PATH)

APOLLO_PATH = apps/$(CLIENT)/src/gql
APOLLO_MUTATIONS_PATH = $(APOLLO_PATH)/mutations
APOLLO_QUERIES_PATH = $(APOLLO_PATH)/queries

apollo:
	mkdir -p $(APOLLO_MUTATIONS_PATH)/lib && touch $(APOLLO_MUTATIONS_PATH)/index.ts
	mkdir -p $(APOLLO_QUERIES_PATH)/lib && touch $(APOLLO_QUERIES_PATH)/index.ts
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/apollo/alias.json p=$(CLIENT)

STORE_PATH = apps/$(CLIENT)/src/store
STORE_FILE_PATH = $(STORE_PATH)/store.ts
REDUCERS_FILE_PATH = $(STORE_PATH)/reducers.ts
WEBPACK_CONFIG_PATH = apps/$(CLIENT)/webpack.config.js

redux:
	yarn add @reduxjs/toolkit redux-thunk redux react-redux
	mkdir -p $(STORE_PATH)/slices/lib
	touch $(STORE_FILE_PATH) $(REDUCERS_FILE_PATH) $(STORE_PATH)/slices/index.ts
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/redux/store.tmpl --silent >> $(STORE_FILE_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/redux/reducers.tmpl --silent >> $(REDUCERS_FILE_PATH)
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/redux/alias.json p=$(CLIENT)

mui:
	yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/lab

express: express-structure express-routes express-libs express-extra mongo

express-clean:
	yarn nx generate @nrwl/workspace:remove api-interfaces --forceRemove --no-interactive

express-setup:
	yarn add --dev @nrwl/express
	yarn nx g @nrwl/express:app api --frontendCLIENT $(CLIENT)

express-structure:
	mkdir -p apps/$(API)/src/controllers/lib && touch apps/$(API)/src/controllers/index.ts
	mkdir -p apps/$(API)/src/decorators/lib && touch apps/$(API)/src/decorators/index.ts
	mkdir -p apps/$(API)/src/middlewares/lib && touch apps/$(API)/src/middlewares/index.ts
	mkdir -p apps/$(API)/src/plagins
	mkdir -p apps/$(API)/src/services/lib && touch apps/$(API)/src/services/index.ts
	mkdir -p apps/$(API)/src/utils/lib && touch apps/$(API)/src/utils/index.ts
	mkdir -p apps/$(API)/src/validators/lib && touch apps/$(API)/src/validators/index.ts
	touch apps/$(API)/.env.local
	touch apps/$(API)/.env
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/express-structure/alias.json p=$(API)

GRAPHQL_SCHEMA_PATH = apps/$(API)/src/schema
GRAPHQL_TYPES_PATH = apps/$(API)/src/types
GRAPHQL_TYPES_ROOT_QUERY_PATH = $(GRAPHQL_TYPES_PATH)/lib/rootQuery.type.ts
GRAPHQL_TYPES_INDEX_PATH = apps/$(API)/src/types/index.ts
GRAPHQL_MUTATIONS_PATH = apps/$(API)/src/mutations
GRAPHQL_MUTATION_FILE_PATH = $(GRAPHQL_SCHEMA_PATH)/mutation.ts
GRAPHQL_SCHEMA_FILE_PATH = $(GRAPHQL_SCHEMA_PATH)/schema.ts

graphql:
	yarn add express-graphql graphql
	mkdir -p $(GRAPHQL_MUTATIONS_PATH)/lib && touch $(GRAPHQL_MUTATIONS_PATH)/index.ts
	mkdir -p $(GRAPHQL_TYPES_PATH)/lib && touch $(GRAPHQL_TYPES_INDEX_PATH) $(GRAPHQL_TYPES_PATH)/lib/rootQuery.type.ts
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/graphql/index.tmpl --silent >> $(GRAPHQL_TYPES_INDEX_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/graphql/rootQuery.type.tmpl --silent >> $(GRAPHQL_TYPES_ROOT_QUERY_PATH)
	mkdir -p $(GRAPHQL_SCHEMA_PATH) && touch $(GRAPHQL_MUTATION_FILE_PATH) $(GRAPHQL_SCHEMA_FILE_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/graphql/mutation.tmpl --silent >> $(GRAPHQL_MUTATION_FILE_PATH)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/graphql/schema.tmpl --silent >> $(GRAPHQL_SCHEMA_FILE_PATH)
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/graphql/alias.json p=$(API)

mongo:
	yarn add mongoose
	mkdir -p apps/$(API)/src/models/lib && touch apps/$(API)/src/models/index.ts
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/mongoose/alias.json p=$(API)

express-libs:
	yarn nx generate @nrwl/workspace:library --name=$(API) --no-component --directory=$(INTERFACES) --importPath=@$(API)/$(INTERFACES) --unitTestRunner=none --no-interactive
	mkdir -p libs/$(INTERFACES)/$(API)/src/lib && touch libs/$(INTERFACES)/$(API)/src/index.ts
	yarn nx generate @nrwl/workspace:library --name=$(API) --no-component --directory=$(CONSTANTS) --importPath=@$(API)/$(CONSTANTS) --unitTestRunner=none --no-interactive
	mkdir -p libs/$(CONSTANTS)/$(API)/src/lib && touch libs/$(CONSTANTS)/$(API)/src/index.ts

ROUTESPATH = apps/$(CLIENT)/src/routes
ROUTERFILEPATH = $(storePath)/router.ts
ROUTESINDEXPATH = $(storePath)/index.ts

express-routes:
	mkdir -p apps/$(CLIENT)/src/routes/lib
	touch apps/$(CLIENT)/src/routes/index.ts $(routerFilePath)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/express-routes/index.tmlp --silent >> $(routesIndexPath)
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/express-routes/router.tmpl --silent >> $(routesIndexPath)

express-extra:
	yarn add cors

workspace: eslint prettier generators
	yarn nx generate @nrwl/workspace:library --no-component --name=$(UTILS) --importPath=@$(UTILS) --no-interactive
	mkdir -p libs/$(UTILS)/src/lib && touch libs/$(UTILS)/src/index.ts
	yarn add cross-env
	# yarn add nodemon

eslint:
	yarn add eslint-plugin-jest eslint-plugin-prettier -D
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/workspace/eslintrc.tmpl --silent > .eslintrc.json

prettier:
	curl https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/workspace/prettier.tmpl --silent > .prettierrc

generators:
	# curl -L https://github.com/Rudchyk/nx-tmpl/raw/main/tools/generators.zip --silent -o ./tools/generators.zip
	# "C:/Program Files/7-Zip/7z.exe" x tools/generators.zip -oC:/playground/nx-tmpl/tools/generators
	# rm -rf tools/generators.zip
	node tools/utils/aliasModify.js a=https://raw.githubusercontent.com/Rudchyk/nx-tmpl/main/tools/tmpls/graphql/alias.json p=$(API)

fix:
	git add .
	git commit -m "$(if $(m),$(m),"fix")"
	git push