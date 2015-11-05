# koco component loader

```javascript
define(['knockout', 'koco-component-loader'],
    function(ko, kocoComponentLoader) {
        'use strict';

        // at app startup, add the koco component loader to kncokout component loaders
        ko.components.loaders.unshift(kocoComponentLoader);
    });
```