<img src="/lib/images/lissajous-logo.png" width="728" height="150" />

### &nbsp;

Performing music in the browser using Javascript.

### &nbsp;

**Kyle Stetz**

# --------------------------------------------------- #

### Lissajous is

an instrument for live coding music.

# --------------------------------------------------- #

It is built on the idea that everything can have a pattern.

# --------------------------------------------------- #
# ----- #

### The Question

What does it mean to build an API that puts live performance first?

# ----- #

**_improvisation_**: to create and perform spontaneously or without preparation

# ----- #
# --------------------------------------------------- #

Demo!

# --------------------------------------------------- #

### Understanding the context

How is this going to be used?

# --------------------------------------------------- #
# ----- #

#### What constraints come from putting performance first?

- Fast fingers require short names
- Lowercase everything
- No weird characters

# ----- #

##### VERY BAD
```javascript
var t = new Track({
  oscillator: 'sine',
  notes: [64,65,66,67],
  volume: 0.5
})
```

# ----- #

##### BAD STILL
```javascript
> var t = new Track()
> t.setOscillator('sine')
> t.setNotes([64,65,66,67])
> t.setVolume(0.5)
```

# ----- #

##### LIL BETTER...
```javascript
> var t = new Track()
> t.oscillator('sine').notes([64,65,66,67]).volume(0.5)
```

# ----- #

##### OK...
```javascript
> var t = new track()
> t.osc('sine').notes([64,65,66,67]).vol(0.5)
```

# ----- #

##### YES
```javascript
> var t = new track()
> t.sine().notes(64,65,66,67).vol(0.5)
```

# ----- #
# --------------------------------------------------- #

### Using the Chrome Console

- Autocomplete is awesome
- It's not buggy and it never will be
- It gives us feedback

# --------------------------------------------------- #

### Part 1: Chaining

Creating a chainable API is easy.

# --------------------------------------------------- #
# ----- #

All of the function's methods must return `this`.

# ----- #

##### Using `prototype`
```javascript
function track() {
  // initialize
}

track.prototype.vol = function() {
  // do stuff
  return this;
}

track.prototype.notes = function() {
  // do stuff
  return this;
}
```

```javascript
var t = new track()
t.vol(1).notes(64)
```

# ----- #
# --------------------------------------------------- #

#### How does this support improvisation?

# --------------------------------------------------- #
# ----- #

### Part 2: Flexibility

How do we write functions that accept variable arguments?

# ----- #

```javascript
var t = new track()
t.notes(64).vol(0.1, 0.2)
t.notes(64, 65, 66).vol(0.1, 0.2, 0.3)
```

# ----- #
# --------------------------------------------------- #


#### Using `arguments`

```javascript
function track() { ... }
track.prototype.vol = function() { ... }
track.prototype.notes = function() { ... }

track.prototype.log = function() {
  console.log(arguments);
  return this;
}
```

# --------------------------------------------------- #
# ----- #

#### It looks like an array

...but it's not

```javascript
function track() { ... }
track.prototype.vol = function() { ... }
track.prototype.notes = function() { ... }

track.prototype.log = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
  return this;
}
```
# ----- #

```javascript
function track() { ... }

track.prototype.vol = function() {
  var args = Array.prototype.slice.call(arguments);
  // do stuff with `args`
  return this;
}

track.prototype.notes = function() {
  var args = Array.prototype.slice.call(arguments);
  // do stuff with `args`
  return this;
}

track.prototype.log = function() {
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
  return this;
}
```

# ----- #
# --------------------------------------------------- #

#### How does this support improvisation?

# --------------------------------------------------- #

### Part 3: Interpreting Arguments

# --------------------------------------------------- #

#### This is bad.

```javascript
var melody1 = [64, 65, 66];
var melody2 = [76, 77, 78];

var t = new track()
t.notes(melody1, melody2)
//  [ [64, 65, 66], [76, 77, 78] ]   ???
```

# --------------------------------------------------- #
# ----- #

#### We can flatten arrays

```javascript
function flattenArguments(args) {
  args = Array.prototype.slice.call(args);
  var flattened = [];
  args.forEach( function(item) {
   flattened = flattened.concat(item);
  });
  return flattened;
}
```

# ----- #

```javascript
function track() { ... }

track.prototype.vol = function() {
  var args = flattenArguments(arguments);
  // pass args to our internal sequencer functions
  return this;
}

track.prototype.notes = function() {
  var args = flattenArguments(arguments);
  // pass args to our internal sequencer functions
  return this;
}
```

# ----- #
# --------------------------------------------------- #

#### How does this support improvisation?

# --------------------------------------------------- #

### Part 4: Functional Tools

The randomness problem:

```javascript
var t = new track()
t.vol( Math.random() )
```

# --------------------------------------------------- #
# ----- #

#### Our API needs to accept callbacks!

# ----- #

##### BAD

```javascript
var t = new track()
t.vol(function() { return Math.random() })
```

# ----- #

##### OK

```javascript
function random() {
  return Math.random();
}

var t = new track()
t.vol(random)
```

# ----- #

##### YES

```javascript
// random float
function rf(min, max) {
  return function() {
    return Math.random() * (max - min) + min;
  }
}

var t = new track()
t.vol( rf(0,1) )
```

# ----- #
# --------------------------------------------------- #

#### What?

# --------------------------------------------------- #
# ----- #

A function can return another function.

```javascript
function randomNumberGenerator() {

  return function() {
    return Math.random();
  }

}

var myGenerator = randomNumberGenerator();
myGenerator()
```

# ----- #

We can use the power of closures to give that function parameters.

```javascript
function randomNumberGenerator(min, max) {

  return function() {
    return Math.random() * (max - min) + min;
  }

}

var myGenerator = randomNumberGenerator(0, 10);
myGenerator()
```

# ----- #
# --------------------------------------------------- #

#### How does this support improvisation?

# --------------------------------------------------- #

### Next Steps

- Build a library of one line songs
- Record audio directly into a track
- Share a "scene" between computers
- **Get others involved!**

#### &nbsp;

http://github.com/kylestetz/lissajous
http://lissajousjs.com
@kylestetz