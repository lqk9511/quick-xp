export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: init dev  build buildTest buildPre clean genConfig genConfigPre

# 项目初始化
init:
	git submodule init
	git submodule update
	yarn
	node ./script/genConfig 
	
# 开发模式
dev:init
	yarn run serve


# build到online环境
build:clean
	make init
	make genConfig
	yarn run build
	rm -rf dist/js/*.map

# 删除dist文件
clean:
	rm -rf dist

# build时的config
genConfig:
	node ./script/genConfig

# 生成api
	#services = apidoc/xjy/module/signature/signature.api

#api:
#	@$(foreach var, $(services), script/goctl api ts -dir  $(dir $(subst apidoc/xjy/,./src/api/,$(var)))， -api $(var) -webapi api/webapi )
