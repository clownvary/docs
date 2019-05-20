---
layout: page
title: Alerts and Infobar
---

Use to show additional information, confirmations, warnings, or alerts.

>Use them sparingly. Don't show more than one at a time.

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## Alerts

### Default

Alert messages start off looking decently neutral—they're just light blue rounded rectangles.

{% example html %}
<div class='alert'>Alert message goes here.</div>
{% endexample %}

You can put multiple paragraphs of text in a alert message—the last paragraph's bottom `margin` will be automatically override.

{% example html %}
<div class='alert'>
  <p>
    This is a longer alert message in it's own paragraph. It ends up looking something like this. If we keep adding more text, it'll eventually wrap to a new line.
  </p>
  <p>And this is another paragraph.</p>
</div>
{% endexample %}


### Variations

Add `.alert-warning` or `.alert-error` to the alert message to make it yellow or red, respectively.

{% example html %}
<div class='alert alert-success alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-check-circle'></span>
  <strong>Well done!</strong>
  You successfully read this important alert message.
</div>
<div class='alert alert-info alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-info-circle'></span>
  <strong>Heads up!</strong>
  This alert needs your attention, but it's not super important.
</div>
<div class='alert alert-warning alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-exclamation-circle'></span> <strong>Warning!</strong>
  Better check yourself, you're not looking too good.
</div>
<div class='alert alert-error alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-times-circle'></span>
  <strong>Oh snap!</strong>
  Change a few things up and try submitting again.
</div>
<div class='alert alert-success alert-success--inverse alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-check-circle'></span>
  <strong>Well done!</strong>
  You successfully read this important alert message.
</div>
<div class='alert alert-info alert-info--inverse alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-info-circle'></span>
  <strong>Heads up!</strong>
  This alert needs your attention, but it's not super important.
</div>
<div class='alert alert-warning alert-warning--inverse alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-exclamation-circle'></span> <strong>Warning!</strong>
  Better check yourself, you're not looking too good.
</div>
<div class='alert alert-error alert-error--inverse alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-times-circle'></span>
  <strong>Oh snap!</strong>
  Change a few things up and try submitting again.
</div>
<div class='alert alert-error alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-times-circle'></span>
  <strong>You have 3 errors on this page.</strong>
  <br>
  <ul>
    <li>
      The
      <strong><u>name</u></strong>
      field is required.
    </li>
    <li>
      The
      <strong><u>email address</u></strong>
      field should have an @ symbol.
    </li>
    <li>
      The
      <strong>
        <u>ZIP</u>
      </strong>
      field should have at least 5 numbers.
    </li>
  </ul>
</div>
<div class='alert alert-warning'>
  <span class='icon-exclamation-circle'></span>
  <strong>Warning!</strong>
  Better check yourself, you're not looking too good.
</div>
<div class='alert alert-error'>
  <span class='icon-times-circle'></span>
  <strong>Oh snap!</strong>
  Change a few things up and try submitting again.
</div>
<div class='alert alert-success'>
  <span class='icon-check-circle'></span>
  <strong>Well done!</strong>
  You successfully read this important alert message.
</div>
<div class='alert alert-info'>
  <span class='icon-info-circle'></span>
  <strong>Heads up!</strong>
  This alert needs your attention, but it's not super important.
</div>
<div class='alert alert-error'>
  <span class='icon-times-circle'></span>
  <strong>You have 3 errors on this page.</strong>
  <br>
  <ul>
    <li>
      The
      <strong>
        <u>name</u>
      </strong>
      field is required.
    </li>
    <li>
      The
      <strong>
        <u>email address</u>
      </strong>
      field should have an @ symbol.
    </li>
    <li>
      The
      <strong>
        <u>ZIP</u>
      </strong>
      field should have at least 5 numbers.
    </li>
  </ul>
</div>
<div class='alert alert-info alert-info-inverse'>
  <span class='icon-info-circle'></span>
  <strong>Look at me!</strong>
  I'm an infobar. I stretch 100% across and I push content down.
</div>
{% endexample %}

### With icon

Add an icon to the left of the alert message to give it some funky fresh attention. Just add `.alert-with-icon` and your AUI icons.

{% example html %}
<div class='alert alert-warning alert-with-icon'>
  <span class='icon-exclamation-circle'></span> <strong>Warning!</strong>
  Alert message with an icon goes here.
</div>
{% endexample %}

### Dismiss

Add a dismiss (close) icon(JavaScript disabled) on the right of any alert message.

{% example html %}
<div class='alert alert-error alert-dismissable'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-times-circle'></span> <strong>Oh snap!</strong>
  Dismissable alert message goes here.
</div>
{% endexample %}


## Infobar

{% example html %}
<div class='infobar'>
  <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button>
  <span class='icon-info-circle'></span><strong>Look at me!</strong> I'm an infobar. I stretch 100% across and I push content down.
</div>
{% endexample %}
