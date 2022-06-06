# Theme-01
Salla new theme 1
 

## API TODO
 
- write about the salla-form-data
    
   
## Watch       
     
```sh  
# 1. create the symlink
rm -rf public/themes/one && ln -s vendor/salla/theme-one/assets public/themes/one
# rm -rf public/themes/one && ln -s ~/works/salla/theme-one/assets public/themes/one
# 2. link the theme one package using salla cli 
 
# lets go to our theme 
cd vendor/salla/theme-one  
   
# 3. link the package  
npm link @salla.sa/twilight

# 3. start watch :)
npm run watch


## everytime you change anything in twilight js just run the follow command after the changes
## in the twilight js root folder and theme one will take the changes while the watch is running
run npm run build
 
```

