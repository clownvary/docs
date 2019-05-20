---
layout: page
title: Accordion
---

## Accordion

Be sure to always have the first accordion item in its expanded state. This helps tell the user that the boxes are expandable/collapsible.

With progress steps, completed step gets a checkmark and the box clickable. Uncompleted steps is disabled (text and “+” symbol is #b3bdc1).

### When to Use

 - Use to categorize different sections within a page.
 - Use for progressive steps (e.g., replace +/- with checkmark).
 - Do not nest accordions in other accordions.

#### Default accordion

{% example html %}
<div class="accordion-group">
  <div class="accordion accordion--show">
    <div class="accordion__header">
      <div class="accordion__header-text">
        Lil Mud Runner kids
      </div>
      <div class="accordion__header-icon">
        <i class="icon-subtract"></i>
      </div>
    </div>
    <div class="accordion__body-container">
      <div class="accordion__body">
        Bring the whole family for a day of fun and fitness. Let your kids play in the mud and tackle obstacles on the 1-mile course, or sign up for the family wave so everyone can get in on the action. Stick around after the race for more festive family fun including tube rides on the lake, music and refreshments.
      </div>
    </div>
  </div>
  <div class="accordion">
    <div class="accordion__header">
      <div class="accordion__header-text">
        Lil Mud Runner kids
      </div>
      <div class="accordion__header-icon">
        <i class="icon-plus"></i>
      </div>
    </div>
    <div class="accordion__body-container">
      <div class="accordion__body">
        Bring the whole family for a day of fun and fitness. Let your kids play in the mud and tackle obstacles on the 1-mile course, or sign up for the family wave so everyone can get in on the action. Stick around after the race for more festive family fun including tube rides on the lake, music and refreshments.
      </div>
    </div>
  </div>
  <div class="accordion">
    <div class="accordion__header">
      <div class="accordion__header-text">
        Lil Mud Runner kids
      </div>
      <div class="accordion__header-icon">
        <i class="icon-plus"></i>
      </div>
    </div>
    <div class="accordion__body-container">
      <div class="accordion__body">
        Bring the whole family for a day of fun and fitness. Let your kids play in the mud and tackle obstacles on the 1-mile course, or sign up for the family wave so everyone can get in on the action. Stick around after the race for more festive family fun including tube rides on the lake, music and refreshments.
      </div>
    </div>
  </div>
</div>
{% endexample %}

#### Progress steps accordion

{% example html %}
<div class="accordion-group">
  <div class="accordion accordion--completed">
    <div class="accordion__header">
      <div class="accordion__header-text">
        Lil Mud Runner kids
      </div>
      <div class="accordion__header-icon">
        <i class="icon-completed"></i>
      </div>
    </div>
    <div class="accordion__body-container">
      <div class="accordion__body">
        Bring the whole family for a day of fun and fitness. Let your kids play in the mud and tackle obstacles on the 1-mile course, or sign up for the family wave so everyone can get in on the action. Stick around after the race for more festive family fun including tube rides on the lake, music and refreshments.
      </div>
    </div>
  </div>
  <div class="accordion accordion--show">
    <div class="accordion__header">
      <div class="accordion__header-text">
        Lil Mud Runner kids
      </div>
      <div class="accordion__header-icon">
        <i class="icon-subtract"></i>
      </div>
    </div>
    <div class="accordion__body-container">
      <div class="accordion__body">
        Bring the whole family for a day of fun and fitness. Let your kids play in the mud and tackle obstacles on the 1-mile course, or sign up for the family wave so everyone can get in on the action. Stick around after the race for more festive family fun including tube rides on the lake, music and refreshments.
      </div>
    </div>
  </div>
  <div class="accordion accordion--disabled">
    <div class="accordion__header">
      <div class="accordion__header-text">
        Lil Mud Runner kids
      </div>
      <div class="accordion__header-icon">
        <i class="icon-plus"></i>
      </div>
    </div>
    <div class="accordion__body-container">
      <div class="accordion__body">
        Bring the whole family for a day of fun and fitness. Let your kids play in the mud and tackle obstacles on the 1-mile course, or sign up for the family wave so everyone can get in on the action. Stick around after the race for more festive family fun including tube rides on the lake, music and refreshments.
      </div>
    </div>
  </div>
</div>
{% endexample %}

