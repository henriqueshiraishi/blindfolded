#!/bin/sh

#Set to 0 if you want to build the example application
BUILD_APP=1

#Packing and compressing UML diagrams
sprocketize -I ./src/core/ ./src/core/*.js> ./temp/UDCore-src.js
sudo java -jar yuicompressor.jar ./temp/UDCore-src.js -o ./build/UDCore.js
cat ./src/core/css/*.css > ./build/css/UDStyle.css
echo 'The UDCore files have been built'

#Packing and compressing the UML library
sprocketize -I ./src/core/ ./src/modules/*/*.js  > ./temp/UDModules-src.js
sudo java -jar yuicompressor.jar ./temp/UDModules-src.js -o ./build/UDModules.js
echo 'The UDModules files have been built'



if [ $BUILD_APP = 0 ]
  then
  #packing the app files
  #sprocketize -I ./src/app/ ./src/app/*.js  > ./temp/UDApplication-src.js
  sprocketize -I ./src/app/ ./src/app/1_umlusecase.js ./src/app/2_umlclass.js ./src/app/8_umlpackage.js ./src/app/9_umlinstances.js ./src/app/3_umlcomponents.js ./src/app/10_umldeployment.js ./src/app/5_umlactivity.js ./src/app/4_umlsequence.js ./src/app/6_umlstatemachine.js ./src/app/7_umlprofile.js > ./temp/UDApplication-src.js

  sudo java -jar yuicompressor.jar ./temp/UDApplication-src.js -o ./build/UDApplication.js

  #move images and style sheets to the build directory
  cp ./src/app/img/* ./build/img/app/
  cat ./src/app/css/*.css >> ./build/css/UDStyle.css
  
  echo 'The Example Application files were successfully built'
  
fi


