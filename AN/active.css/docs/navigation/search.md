---
layout: page
title: Search
---

## Search

### Without feeback

{% example html %}
<div class='search-box'>
  <div class='search-box__input-addon-group'>
    <i class='icon-search'></i>
    <input class='input' type='search' placeholder='Enter search here...'>
  </div>
  <button type='button' class='btn btn-primary btn-sm'>Search</button>
</div>
{% endexample %}

### With feeback

{% example html %}
<div class='search-box'>
  <div class='search-box__input-addon-group search-box__input-addon-group--has-feedback'>
    <i class='icon-search'></i>
    <input class='input' type='search' placeholder='Enter search here...'>
    <span class='icon-times-circle input-feedback active'></span>
  </div>
  <button type='button' class='btn btn-primary btn-sm'>Search</button>
</div>
{% endexample %}
