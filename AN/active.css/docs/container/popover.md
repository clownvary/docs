---
layout: page
title: Popover
---

Popover is use for displaying longer texts and/or images. Popover have a 5px radius, and use a 2px padding between endpoints of the pointer and the content it’s pointing to.

Tooltips, popovers, and labels do not have any drop shadow.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## When to Use

- To display longer texts and/or images.

## Interaction details

- Desktop - Tooltips and popovers should be displayed onHover
- Tablet/Mobile - Tooltips and popovers should be displayed/disappeared on tap. When tooltip appears, tapping anywhere outside of the tooltip will close it.

## Popover

To use a popover you should give a `data-popover-trigger` attribute to the element which will have a popover. You also need to give a `popover` to the popover container, it should be included in the `data-popover-trigger`.
In addition, you'll want to specify a direction:

- `.popover--n`
- `.popover--ne`
- `.popover--e`
- `.popover--se`
- `.popover--s`
- `.popover--sw`
- `.popover--w`
- `.popover--nw`

{% example html %}
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover North
    <div class="popover popover--n">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover NorthWest
    <div class="popover popover--ne">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover East
    <div class="popover popover--e">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover SouthEast
    <div class="popover popover--se">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover South
    <div class="popover popover--s">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover SouthWest
    <div class="popover popover--sw">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover West
    <div class="popover popover--w">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
<p>
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover NorthWest
    <div class="popover popover--nw">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
</p>
{% endexample %}

## Dark theme
Add a `t-dark` class to use the dark theme popover.
{% example html %}
<button class='btn btn-sm btn-secondary' data-popover-trigger type='button'>
    Popover start
    <div class="popover popover--e t-dark">
        <h3 class="popover__title">Title goes here</h3>
        <p class="popover__content">And here's some amazing content. It's very engaging, right?</p>
    </div>
</button>
{% endexample %}
