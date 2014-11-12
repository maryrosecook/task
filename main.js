// my solutions for the article at http://kukuruku.co/hub/javascript/an-interesting-task-for-an-interview-currying-and-partial-applicationof-a-function

function add0(a, b) {
  return a + b;
};

console.log(add0(1, 2));

///////////

function add1(a) {
  return function(b) {
    return a + b;
  };
}

console.log(add1(1)(2))

var addOne1 = add1(1);
console.log(addOne1(2));

/////////

function add2(a) {
  var total = a;
  return function combine(b) {
    if (b === undefined) {
      return total;
    } else {
      total += b;
      return combine;
    }
  };
};

console.log(add2(1)(2)(3)());

////////////

function add3(a) {
  var total = a;
  function combine(b) {
    total += b;
    return combine;
  };

  combine.valueOf = function() {
    return total;
  };

  return combine;
};

console.log(add3(1)(2)(3));

////////////

var addTwo4 = add3(2);
console.log(addTwo4(10)(20).valueOf())
console.log(addTwo4(2)(2).valueOf());

///////////

function add4(a) {
  function combine(b) {
    return add4(a + b);
  };

  combine.valueOf = function() {
    return a;
  };

  return combine;
};

var addTwo4 = add4(2);
console.log(addTwo4(10)(20).valueOf())
console.log(addTwo4(2)(2).valueOf());

////////////////

function add5(a) {
  var valueOf = function(v) {
    return v instanceof Function ? v.val : v;
  };

  function combine(b) {
    return add5(valueOf(a) + valueOf(b));
  };

  combine.val = a;

  combine.valueOf = function() {
    return valueOf(a);
  };

  return combine;
};

var four = add5(4);
console.log(add5(four)(four).valueOf());
console.log(add5(four)(four));
console.log(add5(10)(four).valueOf());
console.log(add5(four)(four)(10).valueOf());
