---
layout: page
title: Tabs
---

## Tabs

### Interaction Details

- Never nest internal page tabs inside of another internal page tab.
- One one tab should be selected at any given time.
- Hover on an active tab – No interaction, the cursor remains an arrow.
- Hover on inactive tab – Cursor changes to a pointer.


{% example html %}
<ul class="nav-tabs">
  <li>
    <a class="active" href="#">Latest</a>
  </li>
  <li>
    <a href="#">Dashboard</a>
  </li>
  <li>
    <a href="#">Admin</a>
  </li>
  <li>
    <a href="#">Long Long Long Long Long Long Long Long Long Long Long link</a>
  </li>
</ul>
{% endexample %}
