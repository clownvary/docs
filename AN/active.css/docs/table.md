---
layout: page
title: Tables
---

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## Data Table

As a general rule, align all table headings to match the content’s alignment. Text content should be left-aligned, and numbers should be right-aligned so that it’s easy to read the difference in numbers. Icons should be center-aligned.

Font size is 16px by default, but may go as low as 14px for tables with heavy content.

Use your best judgment if alignment adjustments are required.

## When to Use

- Data grids are used to display tabular data where users can view, sort, select, and scroll through.

## Interaction Details

- When sorting or selecting tabs, only the table and not the whole page should refresh.

<div class='table-example'>
  {% example html %}
  <table class='table'>
    <thead>
      <tr>
        <th class='text-center'>TYPE</th>
        <th class='sort-icon sort-up'>ID</th>
        <th class='sort-icon sort-down'>EVENT</th>
        <th class='sort-icon sort-down'>PRICE</th>
        <th class='sort-icon sort-down'>DATE</th>
        <th></th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="5" class="text-right total">Total</td>
        <td class="text-right total">$1,593.93</td>
      </tr>
      <tr>
        <td colspan="4">
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn">Action</button>
            <button type="button" class="btn">Action</button>
            <button type="button" class="btn">Action</button>
          </div>
        </td>
        <td colspan="2" class="text-right">Optional status notification</td>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <td class='text-center'>
          <span class='icon-star'></span>
        </td>
        <td>2835</td>
        <td>
          <a href='#'>Multi-Day Party</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013 Add to Cart</td>
        <td>
          <button type='button' class='btn btn-sm btn-strong'>Add to Cart</button>
        </td>
      </tr>
      <tr class='selected'>
        <td class='text-center'>
          <span class='icon-star'></span>
        </td>
        <td>2835</td>
        <td>
          <a href='#'>Multi-Day Party</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013 Add to Cart</td>
        <td>
          <button type='button' class='btn btn-sm btn-strong'>Add to Cart</button>
        </td>
      </tr>
      <tr>
        <td class='text-center'>
          <span class='icon-star'></span>
        </td>
        <td>2835</td>
        <td>
          <a href='#'>Annual Company Meeting</a>
        </td>
        <td>$322.99</td>
        <td>Jun 7, 2013</td>
        <td>
          <button type='button' class='btn btn-sm btn-strong'>Add to Cart</button>
        </td>
      </tr>
      <tr>
        <td class='text-center'>
          <span class='icon-lock'></span>
        </td>
        <td>2835</td>
        <td>
          <a href='#'>Quarterly Meeting</a>
        </td>
        <td>$5.00</td>
        <td>Jun 7, 2013</td>
        <td>
          <button type='button' class='btn btn-sm btn-strong'>Add to Cart</button>
        </td>
      </tr>
      <tr>
        <td class='text-center'>
          <span class='icon-star'></span>
        </td>
        <td>2835</td>
        <td>
          <a href='#'>John's Birthay Party</a>
        </td>
        <td>$0.99</td>
        <td>Jun 7, 2013</td>
        <td>
          <button type='button' class='btn btn-sm btn-strong'>Add to Cart</button>
        </td>
      </tr>
      <tr>
        <td class='text-center'>
          <span class='icon-star'></span>
        </td>
        <td>2835</td>
        <td>
          <a href='#'>Business Lunch</a>
        </td>
        <td>$1235.00</td>
        <td>Jun 7, 2013</td>
        <td>
          <button type='button' class='btn btn-sm btn-strong'>Add to Cart</button>
        </td>
      </tr>
    </tbody>
  </table>
  {% endexample %}
</div>

## Table Variation

This variant data table provides a background color to a row on hover.
<div class='table-example'>
  {% example html %}
  <table class='table table-hover'>
    <thead>
      <tr>
        <th>#</th>
        <th>ID</th>
        <th>EVENT</th>
        <th>PRICE</th>
        <th>DATE</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2835</td>
        <td>
          <a href='#'>Multi-Day Party</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2835</td>
        <td>
          <a href='#'>Annual Company Meeting</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2835</td>
        <td>
          <a href='#'>Quarterly Meeting</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2835</td>
        <td>
          <a href='#'>John's Birthay Party</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2835</td>
        <td>
          <a href='#'>Business Lunch</a>
        </td>
        <td>$29.99</td>
        <td>Jun 7, 2013</td>
      </tr>
    </tbody>
  </table>
  {% endexample %}
</div>
