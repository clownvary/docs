---
layout: page
title: Search box
---

## Search Box

A search box is usually a single-line text box with the dedicated function of accepting user input to search for specific content if they know what search terms to use or can’t find desired content in the main navigation.

### Search Box without Feeback

{% example html %}
<div class='search-box'>
  <div class='search-box__input-addon-group'>
    <i class='icon-search'></i>
    <input class='input' type='search' placeholder='Enter search here...' />
  </div>
  <button type='button' class='btn btn-primary'>Search</button>
</div>
{% endexample %}

### Search Box with Feeback

{% example html %}
<div class='search-box'>
  <div class='search-box__input-addon-group search-box__input-addon-group--has-feedback'>
    <i class='icon-search'></i>
    <input class='input' type='search' placeholder='Enter search here...' />
    <span class='icon-close input-feedback active'></span>
  </div>
  <button type='button' class='btn btn-primary'>Search</button>
</div>
{% endexample %}


### Search Box Sizing

Add `.search-box--lg` to make your search box larger.

{% example html %}
<div class='search-box search-box--lg'>
  <div class='search-box__input-addon-group search-box__input-addon-group--has-feedback'>
    <i class='icon-search'></i>
    <input class='input' type='search' placeholder='Enter search here...' />
    <span class='icon-close input-feedback active'></span>
  </div>
  <button type='button' class='btn btn-primary'>Search</button>
</div>
{% endexample %}

### Search Box works with Button Groups

{% example html %}
<div class='container'>
  <div class='grid'>
    <div class="grid-u-6-12">
      <div class="btn-group btn-group-sm">
        <button type="button" class="btn">Popular</button>
        <button type="button" class="btn">Newest</button>
        <button type="button" class="btn">Bestselling</button>
      </div>
    </div>
    <div class='grid-u-6-12'>
      <div class='search-box'>
        <div class='search-box__input-addon-group'>
          <i class='icon-search'></i>
          <input class='input' type='search' placeholder='Enter search here...' />
        </div>
        <button type='button' class='btn btn-primary'>Search</button>
      </div>
    </div>
  </div>
</div>
{% endexample %}
