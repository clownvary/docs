---
layout: page
title: Grids
---

The **Grid** includes basic page containers and a powerful grid system which is 12ths-based units. You can find all the below styles in `grid.less`.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Container

Layout your page and center it with the CSS class of `.container`.

{% highlight CSS %}
<div class="container">
  <header>...</header>
  <div class='main'>...</div>
  <footer>...</footer>
</div>
{% endhighlight %}

The container will be applied different width depending on your viewport and we set horizontal `margin`s as `auto` to center it.

## Grid

Let's start with a simple example. 

### Regular Grid Demo

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="grid">
      <div class="grid-u-2-12">grid-u-2-12</div>
      <div class="grid-u-2-12">grid-u-2-12</div>
      <div class="grid-u-2-12">grid-u-2-12</div>
      <div class="grid-u-2-12">grid-u-2-12</div>
      <div class="grid-u-2-12">grid-u-2-12</div>
      <div class="grid-u-2-12">grid-u-2-12</div>
    </div>

    <div class="grid">
      <div class="grid-u-3-12">.grid-u-3-12</div>
      <div class="grid-u-3-12">.grid-u-3-12</div>
      <div class="grid-u-3-12">.grid-u-3-12</div>
      <div class="grid-u-3-12">.grid-u-3-12</div>
    </div>

    <div class="grid">
      <div class="grid-u-4-12">.grid-u-4-12</div>
      <div class="grid-u-8-12">.grid-u-8-12</div>
    </div>

    <div class="grid">
      <div class="grid-u-6-12">.grid-u-6-12</div>
      <div class="grid-u-6-12">.grid-u-6-12</div>
    </div>
  </div>
</div>
{% endexample %}

### Reponsive Grid Demo

To create responsive grid, you just need to add corresponding classes: `grid-u-sm-*`, `grid-u-md-*`, `grid-u-lg-*`. Please adjust your viewport size then you'll see the effects.

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="grid">
      <div class="grid-u-12-12 grid-u-sm-6-12 grid-u-md-4-12 grid-u-lg-3-12">
        .grid-u-12-12 .grid-u-sm-6-12 .grid-u-md-4-12 .grid-u-lg-3-12
      </div>
      <div class="grid-u-12-12 grid-u-sm-6-12 grid-u-md-4-12 grid-u-lg-3-12">
        .grid-u-12-12 .grid-u-sm-6-12 .grid-u-md-4-12 .grid-u-lg-3-12
      </div>
      <div class="grid-u-12-12 grid-u-sm-6-12 grid-u-md-4-12 grid-u-lg-3-12">
        .grid-u-12-12 .grid-u-sm-6-12 .grid-u-md-4-12 .grid-u-lg-3-12
      </div>
      <div class="grid-u-12-12 grid-u-sm-6-12 grid-u-md-4-12 grid-u-lg-3-12">
        .grid-u-12-12 .grid-u-sm-6-12 .grid-u-md-4-12 .grid-u-lg-3-12
      </div>
    </div>
  </div>
</div>
{% endexample %}

### Centered

Every grid column could be centered by adding `.centered` to the `.grid-u-*` class.

{% example html %}
<div class="grid-example">
  <div class="grid">
    <div class="grid-u-6-12 centered">.grid-u-6-12</div>
  </div>
</div>
{% endexample %}
