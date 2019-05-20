---
layout: page
title: Flex Grid
---

The **Flex Grid** includes basic page containers and a powerful flex grid system which is 12ths-based units. You can find all the below styles in `flex-grid.less`.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Flex Grid

Let's start with a simple example. 

### Regular flex Grid

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="flex-grid-unit">
          col-8
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
  </div>
</div>
{% endexample %}

### Fluid flex grid

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="row-fluid">
      <div class="col-8">
        <div class="flex-grid-unit">
          col-8
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
  </div>
</div>
{% endexample %}

### Flex grid with gutter

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="row-gutter">
      <div class="col-8">
        <div class="flex-grid-unit">
          col-8
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
  </div>
</div>
{% endexample %}


### Responsive flex grid

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="row">
      <div class="col-sm-2 col-md-6 col-lg-10">
        <div class="flex-grid-unit">
          sm-2
          md-6
          lg-10
        </div>
      </div>
      <div class="col-sm-10 col-md-6 col-lg-2">
        <div class="flex-grid-unit">
          sm-10
          md-6
          lg-2
        </div>
      </div>
    </div>
  </div>
</div>
{% endexample %}


### Vertical position

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="row row-align-start grid-example-v-extend">
      <div class="col-8">
        <div class="flex-grid-unit">
          col-8
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
    <div class="row row-align-center grid-example-v-extend">
      <div class="col-8">
        <div class="flex-grid-unit">
          col-8
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
    <div class="row row-align-end grid-example-v-extend">
      <div class="col-8">
        <div class="flex-grid-unit">
          col-8
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
  </div>
</div>
{% endexample %}

### horizontal position

{% example html %}
<div class="grid-example">
  <div class="container">
    <div class="row row-justify-start">
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
    <div class="row row-justify-center">
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
    <div class="row row-justify-end">
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
    <div class="row row-justify-space-between">
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
    <div class="row row-justify-space-around">
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
      <div class="col-4">
        <div class="flex-grid-unit">
          col-4
        </div>
      </div>
    </div>
  </div>
</div>
{% endexample %}
