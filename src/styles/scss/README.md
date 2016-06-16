## Basic CSS Guidelines
These basic guidelines are meant to help standardize KagenAir stylesheets.


### Keep Selectors Short
Make explicit selections rather than relying on hierarchy. This allows for the selector to be re-used, keeps your CSS DRY and prevents leaking of styles.

**Example:**

```
// bad
body.home div.header ul {  }

// good
.primary-nav {  }

```


###Do Not Over-qualify Selectors
Adding unnecessary qualifiers makes the selector less efficient. Additionally, it increases specificity and limits where you can use the styles.

**Example:**

```
.main-navigation ul {  } // bad
.main-navigation {  } // good

```


###Units
Use rems for units of measurements.


### Variables File
Make sure you @import the variables file at the top of your component scss file to prevent redundancy. Global variables like colour, font sizes, font families, etc., should be declared in `_variables.scss`.  It makes units of measurement and sizes more consistent instead of arbitrary numbers. For very specific component variables, it can be placed at the top of the component stylesheet.

**Example:**

```
@import "variables";

.navbar {
  color: $blue;
}

```

### Z-index File
See the z-index.scss file to manage and define the hierarchy of z-indexes for UI elements. This makes it easy to change the order of layers in one location.

**Example:**

```
$z-layers: (
  'Navigation':         1000,
  'OverviewContainer':  999,
  'ModalContainer':     900,
  'DatePicker':         20,
  'ProfileSaveButton':  10
);

.navbar {
  position: fixed;
  z-index: z('Navigation');
}

```


###Media Queries
Nest your media queries inside your class / elements as it will keep all the rules related to a component in one place. Also use variables for the min and max widths to make it more efficient to change sizes across the application if needed.

**Example:**

```
.navigation {
	position: fixed;
	top: 0;
	height: 2rem;

	@media (min-width: $md) {
		height: 5rem;
	}
}

```


###Nesting limit
Limit nesting to a maximum of three levels.

**Example:**

```
//bad
.one {
  .two {
    .three {
      .four {
        // Stop, this is not Inception
      }
    }
  }
}

//better
.navigation {
  &__button {
    &--active {
      // Some styles
    }
  }
}

```
