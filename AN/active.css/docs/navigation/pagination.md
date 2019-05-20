---
layout: page
title: Pagination
---

As a general rule, stick to pagination instead of infinite scrolling. Use infinite scrolling only if your content opens in a new tab or modal window. If your content opens on the same page, infinite scrolling can frustrate users because if the user clicks to go back, they’ll lose their place. (Another issue with infinite scrolling is that when users get to a certain point in the stream, they can’t bookmark where they are and come back to it later.)

Pagination alignment defaults to right-align, but may be centered.

## When to Use

1. Choose one style for your product.
2. Pagination A – Use when  page layouts are mostly simple and clean.
3. Pagination B – Use when there are many blocks/boxes on pages.

### Pagination A

{% example html %}
<ul class="pagination">
  <li class="active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#"><span class="icon-chevron-right"></span></a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pagination">
  <li><a href="#"><span class="icon-chevron-left"></span></a></li>
  <li><a href="#">1</a></li>
  <li class="active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#"><span class="icon-chevron-right"></span></a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pagination">
  <li><a href="#"><span class="icon-chevron-left"></span></a></li>
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">...</a></li>
  <li><a href="#">8</a></li>
  <li class="active"><a href="#">9</a></li>
  <li><a href="#">10</a></li>
  <li><a href="#">...</a></li>
  <li><a href="#">24</a></li>
  <li><a href="#">25</a></li>
  <li><a href="#"><span class="icon-chevron-right"></span></a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pagination">
  <li><a href="#"><span class="icon-chevron-left"></span></a></li>
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">...</a></li>
  <li><a href="#">21</a></li>
  <li><a href="#">22</a></li>
  <li><a href="#">23</a></li>
  <li><a href="#">24</a></li>
  <li class="active"><a href="#">25</a></li>
</ul>
{% endexample %}

### Pagination B

{% example html %}
<ul class="pagination pagination--noborder">
  <li class="active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><a href="#">Next</a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pagination pagination--noborder">
  <li><a href="#">Previous</a></li>
  <li><a href="#">1</a></li>
  <li class="active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><a href="#">Next</a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pagination pagination--noborder">
  <li><a href="#">Previous</a></li>
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">...</a></li>
  <li><a href="#">8</a></li>
  <li class="active"><a href="#">9</a></li>
  <li><a href="#">10</a></li>
  <li><a href="#">...</a></li>
  <li><a href="#">24</a></li>
  <li><a href="#">25</a></li>
  <li><a href="#">Next</a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pagination pagination--noborder">
  <li><a href="#">Previous</a></li>
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">...</a></li>
  <li><a href="#">21</a></li>
  <li><a href="#">22</a></li>
  <li><a href="#">23</a></li>
  <li><a href="#">24</a></li>
  <li class="active"><a href="#">25</a></li>
</ul>
{% endexample %}

### Pager

{% example html %}
<ul class="pager">
  <li><a href="#"><span class="icon-chevron-left"></span></a></li>
  <li><a href="#"><span class="icon-chevron-right"></span></a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pager">
  <li><a href="#">Previous</a></li>
  <li><a href="#">Next</a></li>
</ul>
{% endexample %}

{% example html %}
<ul class="pager">
  <li><a href="#">Older</a></li>
  <li><a href="#">Newer</a></li>
</ul>
{% endexample %}
