---
layout: page
title: Typography
---

Typography applys into different components, such as headings(`<h1>`-`<h6>`), paragraphs(`<p>`), lists(`<ul>` or `<ol>`), blockquote(`<blockquote>`), as well as some global text styles(`.text-light`, `.text-hint`, etc.).

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## Proxima Nova

The primary font family to be used is **Proxima Nova**. The font should degrade to **Arial, Sans-serif** in CSS if the user’s device does not support this custom web font. So far we are using 6 font weights out of the family: **Regular**, **RegularIt**, **SemiBold**, **SemiBoldIt**, **Bold** and **BoldIt**.

>**Proxima Nova** (2005) straddles the gap between typefaces like Futura and Akzidenz Grotesk. The result is a hybrid that combines modern proportions with a geometric appearance. 

You can learn more about this font and its history from the font designer [Mark Simonson’s website](http://www.marksimonson.com/fonts/view/proxima-nova).

>ACTIVE purchased the rights to these fonts for use on ACTIVE products only. Please do not share these fonts with clients or anyone outside of ACTIVE or you will be in violation of distributing company materials.

{% example html %}
<p><strong>Proxima Nova</strong><br>Regular</p>
<p class='font-extreme'>
  Aa
</p>
<p>
  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
  abcdefghijklmnopqrstuvwxyz<br>
  (.,:;?!$&amp;@*) 0123456789
</p>
{% endexample %}

{% example html %}
<div class='font-semibold'>
  <p><strong>Proxima Nova</strong><br>SemiBold</p>
  <p class='font-extreme'>
    Aa
  </p>
  <p>
    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
    abcdefghijklmnopqrstuvwxyz<br>
    (.,:;?!$&amp;@*) 0123456789
  </p>
</div>
{% endexample %}

{% example html %}
<div class='font-bold'>
  <p><strong>Proxima Nova</strong><br>Bold</p>
  <p class='font-extreme font-bold'>
    Aa
  </p>
  <p class='font-bold'>
    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
    abcdefghijklmnopqrstuvwxyz<br>
    (.,:;?!$&amp;@*) 0123456789
  </p>
</div>
{% endexample %}


### Font Usage

- Proxima Semibold is used for headlines.
- Proxima Bold and allcaps are used for H6 due to its size.
- Proxima Regular is used for body fonts.

### Download

- [Download desktop fonts](http://sgd.dev.activenetwork.com:3000/assets/fonts/ProximaNova_desktopfont.zip) (for designers).
- [Download web fonts](http://sgd.dev.activenetwork.com:3000/assets/fonts/ProximaNova_webfonts.zip) (for developers).

## Headings

{% example html %}
<h1>h1. Active heading</h1>
<h2>h2. Active heading</h2>
<h3>h3. Active heading</h3>
<h4>h4. Active heading</h4>
<h5>h5. Active heading</h5>
<h6>h6. Active heading</h6>
{% endexample %}


## Body text

{% example html %}
<p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.</p>
<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
{% endexample %}


## Body Font Sizes

{% example html %}
<p>
  <span class='text-xl'>Font XL (24px)</span><br>
  <span class='text-lg'>Font L (20px)</span><br>
  Body Font M (16px default)<br>
  <span class='text-sm'>Font S (14px)</span><br>
  <span class='text-xs'>Font XS (12px)</span>
</p>
{% endexample %}

## Font Attributes

{% example html %}
<p>
  <div class='text-left'>Text left</div><br>
  <div class='text-right'>Text right</div>
</p>
<p>
  <span class='text-light'>Light Color Text</span><br>
  <span class='text-xs'>color: Rolling Stone</span>
</p>
<p>
  <span class='text-hint'>Hint Text Color</span><br>
  <span class='text-xs'>color: Loblolly</span>
</p>
<p>
  <strong>Strong/Bold</strong><br>
  <span class='text-xs'><strong>font: Proxima SemiBold</strong></span>
</p>
{% endexample %}

## Links

{% example html %}
<p>
  <a href='#'>Click On This Link Example</a><br>
  <small>
    Only use Cerulean (or theme default link colour) for something clickable.<br>
    link color: <a href='/aui/colors'>Cerulean</a> (or your theme’s link color)<br>
    hover state: underline and <a href='http://hexcolortool.com' target='_blank'>darken link colour by 15%</a>
  </small>
</p>
{% endexample %}

## Breadcrumbs

{% example html %}
<div class='breadcrumb'>
  <a href='#'>Home</a>
  &gt;
  <a href='#'>Outdoors</a>
  &gt;
  <a href='#' class='active'>Camping</a>
</div>
{% endexample %}

## Inline Text Elements

We also provide the default styles for some common inline elements, such as [`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark), [`<del>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del), [`<s>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s) (Not recommended), [`<ins>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins), [`<u>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u) (Not recommended), [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small), [`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em) and so on.

We should choose these inline elements depending on your context. For example, use `<s>` to represent things that are no longer relevant or no longer accurate, but if you want to indicate document edits, please use `<del>` and `<ins>` lements instead for more precise.

{% example html %}
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
{% endexample %}

## Blockquote

Drop your HTML contents into the `<blockquote>` indicating that the enclosed text is an extended quotation. Recommend using `<p>` to wrap the contents.

{% example html %}
<blockquote cite="https:///www.google.com">
  <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
</blockquote>
{% endexample %}

## List

### Unordered List

A list of items in which the order does **not** explicitly matter.

{% example html %}
<ul>
  <li>Spoke as as other again ye. </li>
  <li>Any delicate you how kindness horrible outlived servants.
    <ul>
      <li>You high bed wish help call draw side. </li>
      <li>Do in laughter securing smallest sensible no mr hastened. </li>
      <li>As perhaps proceed in in brandon of limited unknown greatly.</li>
      <li>Indulgence announcing uncommonly met she continuing two unpleasing terminated.</li>
    </ul>
  </li>
  <li>He an thing rapid these after going drawn or. </li>
  <li> In surprise concerns informed betrayed he learning is yHe an thing rapid these after going drawn or.</li>
  <li>Eget porttitor lorem</li>
</ul>
{% endexample %}

### Ordered List

A list of items in which the order **does** explicitly matter.

{% example html %}
<ol>
  <li>Spoke as as other again ye. </li>
  <li>Any delicate you how kindness horrible outlived servants.
    <ol>
      <li>You high bed wish help call draw side. </li>
      <li>Do in laughter securing smallest sensible no mr hastened. </li>
      <li>As perhaps proceed in in brandon of limited unknown greatly.</li>
      <li>Indulgence announcing uncommonly met she continuing two unpleasing terminated.</li>
    </ol>
  </li>
  <li>He an thing rapid these after going drawn or. </li>
  <li> In surprise concerns informed betrayed he learning is yHe an thing rapid these after going drawn or.</li>
  <li> Ignorant formerly so ye blessing. He as spoke avoid given downs money on we. Of properly carriage shutters ye as wandered up repeated moreover</li>
</ol>
{% endexample %}
