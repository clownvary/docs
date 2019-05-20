---
layout: page
title: Buttons
---

There are always at least three types of buttons: one with a primary color, one secondary, and one neutral color. Aside from dropdown and special buttons (social, branding, etc.), buttons NEVER contain icons mixed with text.

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## When to use

- Strong primary – Use for the main primary task and to communicate clearer CTAs. E.g., Login, Finish, Submit
- Primary – Use to communicate the most important action on a page. I.e., What is the main task? What drives the user towards conversion? E.g., Next
- Secondary or Neutral – Use to indicate the action of lesser importance. e.g, Back. Also Use when there is more than one localized actions on a page where none is the primary action. E.g., where there are multiple actions like Cancel, or Transfer, etc.

## Interation Details

- OnHover – Change the cursor to a pointer.

## Buttons

### Default buttons


{% example html %}
<button class='btn' type='button' onclick='alert("clicked")'>Button button</button>
<a class='btn' href='http://www.baidu.com/' role='button'>Link button</a>
{% endexample %}

### Strong Button

{% example html %}
<button class='btn btn-strong' type='button'>Strong button</button>
<button class='btn btn--sm btn-strong' type='button'>Small strong button</button>
{% endexample %}

### Primary Button

{% example html %}
<button class='btn btn-primary' type='button'>Primary button</button>
<button class='btn btn--sm btn-primary' type='button'>Small primary button</button>
{% endexample %}

### Secondary Button

{% example html %}
<button class='btn btn-secondary' type='button'>Secondary button</button>
<button class='btn btn--sm btn-secondary' type='button'>Secondary button</button>
{% endexample %}

## Sizing

There're five sizes for buttons: the default `.btn`, the XS button with `.btn--xs`, the small button with `.btn--sm`, the large button with `.btn--lg` and the XL button with `.btn--xl`.

{% example html %}
<button type='button' class='btn btn-strong btn--xs'>XS Button</button>
<button type='button' class='btn btn-primary btn--xs'>XS Button</button>
<button class='btn btn-secondary btn--xs' type='button'>Small button</button>
{% endexample %}

{% example html %}
<button type='button' class='btn btn-strong btn--sm'>Small Button</button>
<button type='button' class='btn btn-primary btn--sm'>Small Button</button>
<button class='btn btn-secondary btn--sm' type='button'>Small button</button>
{% endexample %}

{% example html %}
<button type='button' class='btn btn-strong'>Button</button>
<button type='button' class='btn btn-primary'>Button</button>
<button class='btn btn-secondary' type='button'>button</button>
{% endexample %}

{% example html %}
<button type='button' class='btn btn-strong btn--lg'>Large Button</button>
<button type='button' class='btn btn-primary btn--lg'>Large Button</button>
<button class='btn btn-secondary btn--lg' type='button'>Large button</button>
{% endexample %}

{% example html %}
<button type='button' class='btn btn-strong btn--xl'>XL Button</button>
<button type='button' class='btn btn-primary btn--xl'>XL Button</button>
<button class='btn btn-secondary btn--xl' type='button'>XL button</button>
{% endexample %}

## Disabled state

{% example html %}
<button class='btn' type='button' disabled>Disabled button</button>
<a class='btn disabled' href='#' role='button'>Disabled button</a>
{% endexample %}

{% example html %}
<button class='btn btn-strong' type='button' disabled>Disabled button</button>
<a class='btn btn-strong disabled' href='#' role='button'>Disabled button</a>
{% endexample %}

{% example html %}
<button class='btn btn-primary' type='button' disabled>Disabled button</button>
<a class='btn btn-primary disabled' href='#' role='button'>Disabled button</a>
{% endexample %}

{% example html %}
<button class='btn btn-secondary' type='button' disabled>Disabled button</button>
<a class='btn btn-secondary disabled' href='#' role='button'>Disabled button</a>
{% endexample %}

## Alignment and icon usage

{% example html %}
<button type="button" class="btn btn-primary">Button</button>
<button type="button" class="btn btn-primary"><span class="icon-chevron-right"></span></button>
{% endexample %}

## Loading buttons

{% example html %}
<button type="button" class="btn btn-strong btn--loading"><i class='icon-spinner icon--loading'></i><span>Submit</span></button>
<button type="button" class="btn btn-primary btn--loading"><i class='icon-spinner icon--loading'></i></button>
{% endexample %}

## Social buttons

Use the following social buttons for sign up, login, and connecting accounts, etc.

{% example html %}
<button class='btn btn-social btn-social--facebook' type='button'>
  <span class='icon-facebook'></span>
</button>
<button class='btn btn-social btn-social--facebook' type='button'>
  <span class='icon-facebook'></span>
</button>
<button class='btn btn-social btn-social--twitter' type='button'>
  <span class='icon-twitter'></span>
</button>
<button class='btn btn-social btn-social--google' type='button'>
  <span class='icon-google'></span>
</button>
<button class='btn btn-social btn-social--linkedin' type='button'>
  <span class='icon-linkedin'></span>
</button>
<button class='btn btn-social btn-social--youtube' type='button'>
  <span class='icon-youtube'></span>
</button>
<button class='btn btn-social btn-social--vimeo' type='button'>
  <span class='icon-vimeo'></span>
</button>
<button class='btn btn-social btn-social--instagram' type='button'>
  <span class='icon-instagram'></span>
</button>
<button class='btn btn-social btn-social--flickr' type='button'>
  <span class='icon-flickr'></span>
</button>
<button class='btn btn-social btn-social--foursquare' type='button'>
  <span class='icon-foursquare'></span>
</button>
<button class='btn btn-social btn-social--tumblr' type='button'>
  <span class='icon-tumblr'></span>
</button>
{% endexample %}
