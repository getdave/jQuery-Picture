{"version":3,"file":"js/jquery-picture.min.js","sources":["js/jquery-picture.js"],"names":["$","fn","picture","args","defaults","container","ignorePixelRatio","useLarger","insertElement","inlineDimensions","settings","extend","this","each","getCurrentMedia","init","element","get","tagName","toLowerCase","mediaObj","data","media","num","replace","breakpoints","push","parseInt","find","attr","sort","a","b","c","windowWidth","window","width","PixelRatio","i","v","idx","indexOf","length","currentMedia","setFigure","setPicture","sizes","path","prep","append","load","height","timeoutOffset","undefined","devicePixelRatio","remove","resize","clearTimeout","setTimeout","jQuery"],"mappings":"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"}