---
layout: page
title: ProgressSteps
---

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}


## Progress Steps

For progress steps width, use the longest text, and base all buttons on that length to create buttons with equal widths. If equal width is not applicable, fluid width with 20px side paddings is okay as a fallback option. As a general rule, keep the steps evenly spaced and centered within the page container.

Use mainly for restricted progressions where users cannot skip a step via this progress steps.

### Interaction Details

- Default – The first step is selected.
- Completed steps – Becomes a link and is clickable. On hover, button becomes a pointer. The user can go to any completed step non-serially.
- Disabled state – Should not be clickable.

{% example html %}
<ul class='progress-steps'>
  <li class='past progress-steps__step'><span class='progress-steps__step-text'>SELECT JOBS</span></li>
  <li class='active progress-steps__step'><span class='progress-steps__step-text'>SIGN IN</span></li>
  <li class='next progress-steps__step'><span class='progress-steps__step-text'>COMPLETE FORM</span></li>
  <li class='next progress-steps__step'><span class='progress-steps__step-text'>REVIEW AND SUBMIT</span></li>
</ul>
{% endexample %}


{% example html %}
<ul class='progress-steps'>
  <li class='past progress-steps__step'>
    <span class='progress-steps__step-text'>
      <a href='#'>SELECT JOBS<i class='icon-check'></i></a>
    </span>
  </li>
  <li class='active progress-steps__step'><span class='progress-steps__step-text'>SIGN IN</span></li>
  <li class='next progress-steps__step'><span class='progress-steps__step-text'>COMPLETE FORM</span></li>
  <li class='next progress-steps__step'><span class='progress-steps__step-text'>REVIEW AND SUBMIT</span></li>
</ul>
{% endexample %}


{% example html %}
<ul class='progress-steps'>
  <li class='past progress-steps__step'>
    <span class='progress-steps__step-text'>
      <a href='#'>SELECT JOBS<i class='icon-check'></i></a>
    </span>
  </li>
  <li class='past progress-steps__step'>
    <span class='progress-steps__step-text'>
      <a href='#'>SIGN IN<i class='icon-check'></i></a>
    </span>
  </li>
  <li class='past progress-steps__step'><span class='progress-steps__step-text'>COMPLETE FORM</span></li>
  <li class='active progress-steps__step'><span class='progress-steps__step-text'>REVIEW AND SUBMIT</span></li>
</ul>
{% endexample %}

### Sizing

{% example html %}
<ul class='progress-steps progress-steps--sm'>
  <li class='past progress-steps__step'><span class='progress-steps__step-text'>SELECT JOBS</span></li>
  <li class='active progress-steps__step'><span class='progress-steps__step-text'>SIGN IN</span></li>
  <li class='next progress-steps__step'><span class='progress-steps__step-text'>COMPLETE FORM</span></li>
  <li class='next progress-steps__step'><span class='progress-steps__step-text'>REVIEW AND SUBMIT</span></li>
</ul>
{% endexample %}
