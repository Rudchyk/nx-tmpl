7z = "C:/Program Files/7-Zip/7z.exe"

zip: gen
	$(7z) a element.zip ./element/*
	$(7z) a redux.zip ./redux/*

clean:
	rm -rf element.zip redux.zip ../generators.zip

gen:
	rm -rf ../generators.zip
	$(7z) a ../generators.zip ./redux
	$(7z) a ../generators.zip ./element