---
layout: page
title: Forms
---

### Form

Forms play an important part in all of ACTIVE's products. The customized form styles in this style guide include text fields, radio buttons, checkboxes, drop downs, billing/credit card forms and template examples. Usage of customized form styles are preferred in all products.


## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## Forms

### Basic form

{% example html %}
<div class="forms-example">
  <div class="container">
    <div class="alert alert-danger">
      <span class="icon-times-circle"></span> <strong>Oh snap!</strong>
      Change a few things up and try submitting again.
    </div>
    <form class="form">
      <div class="form__group">
        <label class="form__label" for="email">Email</label>
        <div class="form__control">
          <input type="text" class="input" name="email" placeholder="Email" />
        </div>
      </div>
      <div class="form__group">
        <label class="form__label form__label--require" for="Requirement">Requirement</label>
        <div class="form__control">
          <input type="text" class="input" name="email" placeholder="Requirement" />
        </div>
      </div>
      <div class="form__group form__group--disabled">
        <label class="form__label" for="Disabled">Disabled</label>
        <div class="form__control">
          <div class="input-group input-group--disabled">
            <input disabled type="text" class="input" name="Disabled" placeholder="Disabled" />
          </div>
          <br />
          <div class="dropdown">
            <button disabled class="dropdown__button disabled" type="button" >
              <span class="dropdown__button-text">Select One</span>
              <span class="icon-chevron-down"></span>
            </button>
          </div>
          <br />
          <div class='input-group input-group--disabled'>
            <span class='input-group__item'> <i class='icon icon-user'></i>
            </span>
            <input disabled type='text' class='input input-group__field' placeholder="Disabled"></div>
          <div class='input-group input-group--icon input-group--disabled'>
            <span class='input-group__item'> <i class='icon icon-user'></i>
            </span>
            <input disabled type='text' class='input input-group__field' placeholder="Disabled"></div>
          <div class="dropdown">
            <button disabled class="dropdown__button disabled" type="button" >
              <i class="dropdown__prefix-icon icon-location"></i>
              <span class="dropdown__button-text">Select One</span>
              <span class="icon-chevron-down"></span>
            </button>
          </div>
        </div>
        <div class="form__validate">
          <i class="icon-info-circle"></i>
          This field is disabled
        </div>
      </div>
      <div class="form__group form__group--warning">
        <label class="form__label" for="Warning">Warning</label>
        <div class="form__control">
          <input type="text" class="input" name="Warning" placeholder="Warning" />
          <br />
          <div class="dropdown">
            <button class="dropdown__button" type="button" >
              <span class="dropdown__button-text">Select One</span>
              <span class="icon-chevron-down"></span>
            </button>
          </div>
          <br />
          <div class='input-group'>
            <span class='input-group__item'>
              <i class='icon icon-user'></i>
            </span>
            <input type='text' class='input input-group__field' placeholder="Warning"></div>
          <div class='input-group input-group--icon'>
            <span class='input-group__item'>
              <i class='icon icon-user'></i>
            </span>
            <input type='text' class='input input-group__field' placeholder="Warning"></div>
          <div class="dropdown">
            <button class="dropdown__button" type="button" >
              <i class="dropdown__prefix-icon icon-location"></i>
              <span class="dropdown__button-text">Select One</span>
              <span class="icon-chevron-down"></span>
            </button>
          </div>
        </div>
        <div class="form__validate">
          <i class="icon-info-circle"></i>
          Something may have gone wrong
        </div>
      </div>
      <div class="form__group form__group--error">
        <label class="form__label" for="Error">Error</label>
        <div class="form__control">
          <input type="text" class="input" name="Error" placeholder="Error" />
        </div>
        <br />
        <div class="dropdown">
          <button class="dropdown__button" type="button" >
            <span class="dropdown__button-text">Select One</span>
            <span class="icon-chevron-down"></span>
          </button>
        </div>
        <br />
        <div class='input-group'>
          <span class='input-group__item'>
            <i class='icon icon-user'></i>
          </span>
          <input type='text' class='input input-group__field' placeholder="Error"></div>
        <div class='input-group input-group--icon'>
          <span class='input-group__item'>
            <i class='icon icon-user'></i>
          </span>
          <input type='text' class='input input-group__field' placeholder="Error"></div>
        <div class="dropdown">
          <button class="dropdown__button" type="button" >
            <i class="dropdown__prefix-icon icon-location"></i>
            <span class="dropdown__button-text">Select One</span>
            <span class="icon-chevron-down"></span>
          </button>
        </div>
        <div class="form__validate">
          <i class="icon-times-circle"></i>
          <span>Please explain the error</span>
        </div>
      </div>
      <div class="form__group form__group--success">
        <label class="form__label" for="Success">Success</label>
        <div class="form__control">
          <input type="text" class="input" name="Success" placeholder="Success" />
        </div>
        <br />
        <div class="dropdown">
          <button class="dropdown__button" type="button" >
            <span class="dropdown__button-text">Select One</span>
            <span class="icon-chevron-down"></span>
          </button>
        </div>
        <br />
        <div class='input-group'>
          <span class='input-group__item'>
            <i class='icon icon-user'></i>
          </span>
          <input type='text' class='input input-group__field' placeholder="Success"></div>
        <div class='input-group input-group--icon'>
          <span class='input-group__item'>
            <i class='icon icon-user'></i>
          </span>
          <input type='text' class='input input-group__field' placeholder="Success"></div>
        <div class="dropdown">
          <button class="dropdown__button" type="button" >
            <i class="dropdown__prefix-icon icon-location"></i>
            <span class="dropdown__button-text">Select One</span>
            <span class="icon-chevron-down"></span>
          </button>
        </div>
        <div class="form__validate">
          <i class="icon-check-circle"></i>
          Epic loots!
        </div>
      </div>
      <div class="form__group">
        <button type='button' class='btn btn-default btn-sm'>Submit</button>
      </div>
    </form>
  </div>
</div>
{% endexample %}

### Inline form

{% example html %}
<div class="forms-example">
  <div class="container">
    <div class="alert alert-danger alert-dismissable">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
      <span class="icon-times-circle"></span> <strong>You have 3 errors on this page.</strong>
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
    <form class="form--inline">
      <div class="form__group">
        <label class="form__label" for="email">Email</label>
        <div class="form__control">
          <input type="text" class="input" name="email" placeholder="Email" />
        </div>
      </div>
      <div class="form__group form__group--disabled">
        <label class="form__label" for="Disabled">Disabled</label>
        <div class="form__control">
          <input disabled type="text" class="input" name="Disabled" placeholder="Disabled" />
        </div>
      </div>
      <div class="form__group form__group--warning">
        <label class="form__label" for="Warning">Warning</label>
        <div class="form__control">
          <input type="text" class="input" name="Warning" placeholder="Warning" />
        </div>
      </div>
      <div class="form__group form__group--error">
        <label class="form__label" for="Error">Error</label>
        <div class="form__control">
          <input type="text" class="input" name="Error" placeholder="Error" />
        </div>
      </div>
      <div class="form__group form__group--success">
        <label class="form__label" for="Success">Success</label>
        <div class="form__control">
          <input type="text" class="input" name="Success" placeholder="Success" />
        </div>
      </div>
      <div class="form__group">
        <label class="form__label"></label>
        <div class="form__control">
          <button type='button' class='btn btn-default btn-sm'>Submit</button>
        </div>
      </div>
    </form>
  </div>
</div>
{% endexample %}

### Horizontal form

{% example html %}
<div class="forms-example">
  <div class="container">
    <div class="alert alert-danger alert-dismissable">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
      <span class="icon-times-circle"></span>
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
    <form class="form--horizontal">
      <div class="form__group row row-gutter row-align-center">
        <label class="form__label col col-3" for="email">Email</label>
        <div class="form__control col col-6">
          <input type="text" class="input" name="email" placeholder="Email" />
        </div>
      </div>
      <div class="form__group row row-gutter row-align-center">
        <label class="form__label col col-3" for="email">Email</label>
        <div class="form__control col col-6">
          <div class='form__control--static'>email@mail.com</div>
        </div>
      </div>
      <div class="form__group row row-gutter row-align-center">
        <label class="form__label form__label--require col col-3" for="email">Requirement</label>
        <div class="form__control col col-6">
          <input type="text" class="input" name="email" placeholder="Requirement" />
        </div>
      </div>
      <div class="form__group form__group--disabled row row-gutter row-align-center">
        <label class="form__label col col-3" for="disabled">Disabled</label>
        <div class="form__control col col-6">
          <input disabled type="text" class="input" name="Warning" placeholder="Warning" />
        </div>
        <div class="form__validate col col-3">
          <i class="icon-info-circle"></i>
          This field is disabled
        </div>
      </div>
      <div class="form__group form__group--warning row row-gutter row-align-center">
        <label class="form__label col col-3" for="email">Warning</label>
        <div class="form__control col col-6">
          <input type="text" class="input input--sm" name="Warning" placeholder="Warning" />
        </div>
        <div class="form__validate col col-3">
          <i class="icon-info-circle"></i>
          Something may have gone wrong
        </div>
      </div>
      <div class="form__group form__group--error row row-gutter row-align-center">
        <label class="form__label col col-3" for="email">Error</label>
        <div class="form__control col col-6">
          <input type="text" class="input" name="Error" placeholder="Error" />
        </div>
        <div class="form__validate col col-3">
          <i class="icon-times-circle"></i>
          Please explain the error
        </div>
      </div>
      <div class="form__group form__group--success row row-gutter row-align-center">
        <label class="form__label col col-3" for="email">Success</label>
        <div class="form__control col col-6">
          <input type="text" class="input input--lg" name="Success" placeholder="Success" />
        </div>
        <div class="form__validate col col-3">
          <i class="icon-check-circle"></i>
          Epic loots!
        </div>
      </div>
      <div class="form__group row row-gutter row-align-center">
        <label class="form__label col col-3"></label>
        <div class="form__control col col-6">
          <button type='button' class='btn btn-default btn-sm'>Submit</button>
        </div>
      </div>
    </form>
  </div>
</div>
{% endexample %}

### Flex form

{% example html %}
<div class="forms-example">
  <div class="container">
    <div class="alert alert-danger alert-dismissable">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
      <span class="icon-times-circle"></span>
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
    <form class="form--horizontal">
      <div class="form__group form__group--flex row-fluid row-gutter row-align-center">
        <label class="col col-12 col-sm-3 form__label form__label--require" for="email">Email</label>
        <div class="form__control col col-12 col-sm-6">
          <input type="text" class="input" name="email" placeholder="Email" />
        </div>
      </div>
      <div class="form__group form__group--flex row-fluid row-gutter row-align-center">
        <label class="form__label col col-12 col-sm-3" for="email">Email</label>
        <div class="form__control col col-12 col-sm-6">
          <div class='form__control--static'>email@mail.com</div>
        </div>
      </div>
      <div class="form__group form__group--flex row-fluid row-gutter row-align-center">
        <label class="form__label form__label--require col col-12 col-sm-3" for="email">Requirement</label>
        <div class="form__control col col-12 col-sm-6">
          <input type="text" class="input" name="email" placeholder="Requirement" />
        </div>
      </div>
      <div class="form__group form__group--flex form__group--disabled row-fluid row-gutter row-align-center">
        <label class="form__label col col-12 col-sm-3" for="disabled">Disabled</label>
        <div class="form__control col col-12 col-sm-6">
          <input disabled type="text" class="input" name="Warning" placeholder="Warning" />
        </div>
        <div class="form__validate col col-12 col-sm-3">
          <i class="icon-info-circle"></i>
          This field is disabled
        </div>
      </div>
      <div class="form__group form__group--flex form__group--warning row-fluid row-gutter row-align-center">
        <label class="form__label col col-12 col-sm-3" for="email">Warning</label>
        <div class="form__control col col-12 col-sm-6">
          <input type="text" class="input input--sm" name="Warning" placeholder="Warning" />
        </div>
        <div class="form__validate col col-12 col-sm-3">
          <i class="icon-info-circle"></i>
          Something may have gone wrong
        </div>
      </div>
      <div class="form__group form__group--flex form__group--error row-fluid row-gutter row-align-center">
        <label class="form__label col col-12 col-sm-3" for="email">Error</label>
        <div class="form__control col col-12 col-sm-6">
          <input type="text" class="input" name="Error" placeholder="Error" />
        </div>
        <div class="form__validate col col-12 col-sm-3">
          <i class="icon-times-circle"></i>
          Please explain the error
        </div>
      </div>
      <div class="form__group form__group--flex form__group--success row-fluid row-gutter row-align-center">
        <label class="form__label col col-12 col-sm-3" for="email">Success</label>
        <div class="form__control col col-12 col-sm-6">
          <input type="text" class="input input--lg" name="Success" placeholder="Success" />
        </div>
        <div class="form__validate col col-12 col-sm-3">
          <i class="icon-check-circle"></i>
          Epic loots!
        </div>
      </div>
      <div class="form__group form__group--flex row-fluid row-gutter row-align-center">
        <label class="form__label col col-12 col-sm-3"></label>
        <div class="form__control col col-12 col-sm-6">
          <button type='button' class='btn btn-default btn-sm'>Submit</button>
        </div>
      </div>
    </form>
  </div>
</div>
{% endexample %}

## Text Fields

Form labels are left-aligned, with required fields marked with an asterisk (Red color) in its own column. Texts are 16px, River Bed color, semibold for labels. Sample texts are Loblolly color. Labels use sentence capitalization style.

### When to Use

- Field labels - May be placed inside textfields for short forms such as logins, search, etc.
- Required fields red asterisk. If a form page is filled with mostly required fields, simply label the optional field(s).
- Checkboxes under textfields. Use the Small checkbox size.

### Inputs

{% example html %}
<input type='text' class='input'>
<br>
<input type='number' class='input' placeholder='Your number here'>
<br>
<input type='text' class='input' value='Your value here'>
{% endexample %}

### Inputs Sizing

{% example html %}
<input type='text' class='input input--sm'>
<br>
<input type='number' class='input' placeholder='Your number here'>
<br>
<input type='text' class='input input--lg' value='Your value here'>
{% endexample %}

### Input Groups

{% example html %}
<div class='input-group'>
  <span class='input-group__item'>@</span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group'>
  <input type='text' class='input input-group__field'></div>

<div class='input-group'>
  <input type='text' class='input input-group__field'>
  <span class='input-group__item'>.00</span>
</div>

<div class='input-group'>
  <span class='input-group__item'>
    <i class='icon icon-search'></i>
  </span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group input-group--icon'>
  <span class='input-group__item'>
    <i class='icon icon-user'></i>
  </span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group input-group--icon'>
  <input type='text' class='input input-group__field'>
  <span class='input-group__item'>
    <i class='icon icon-user'></i>
  </span>
</div>

<div class='input-group'>
  <input type='text' class='input input-group__field'>
  <button class='input-group__item btn btn-strong'>Go</button>
</div>

<div class='input-group'>
  <label class='checkbox input-group__item'>
    <input type='checkbox' />
    <span class='checkbox__text'></span>
  </label>
  <input type='text' class='input input-group__field'></div>

<div class='input-group'>
  <span class='input-group__item'>
    <label class="radio-wrapper">
      <span class="radio">
        <input type="radio" class="radio__input">
        <span class="radio__inner"></span>
      </span>
    </label>
  </span>
  <input type='text' class='input input-group__field'></div>
{% endexample %}

### Input Group with Error

{% example html %}
<div class='input-group input-group--lg input-group--error'>
  <span class='input-group__item'>@</span>
  <input type='text' class='input input-group__field' value='Please input here!' />
</div>

<div class='input-group input-group--error'>
  <span class='input-group__item'>
    <i class='icon icon-search'></i>
  </span>
  <input type='text' class='input input-group__field' value='Please input here!' />
</div>

<div class='input-group input-group--icon input-group--error'>
  <span class='input-group__item'>
    <i class='icon icon-user'></i>
  </span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group input-group--sm input-group--error'>
  <span class='input-group__item'>@</span>
  <input type='text' class='input input-group__field' value='Please input here!' />
</div>
{% endexample %}

### Input Group Sizing

{% example html %}
<div class='input-group input-group--lg'>
  <span class='input-group__item'>@</span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group input-group'>
  <span class='input-group__item'>@</span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group input-group--sm'>
  <span class='input-group__item'>@</span>
  <input type='text' class='input input-group__field'></div>

<div class='input-group input-group--sm input-group--icon'>
  <span class='input-group__item'>
    <i class='icon icon-user'></i>
  </span>
  <input type='text' class='input input-group__field'></div>
{% endexample %}

### Input Groups --- Appended and Prepended Add-ons

{% example html %}
<div class='input-group'>
  <span class='input-group__item'>
    <i class='icon icon-google-rounded'></i>
  </span>
  <input type='text' class='input input-group__field'>
  <span class='input-group__item'>Goolge it!</span>
</div>

<div class='input-group input-group--lg'>
  <span class='input-group__item'>Goolge it!</span>
  <input type='text' class='input input-group__field'>
  <span class='input-group__item'>
    <i class='icon icon-google-rounded'></i>
  </span>
</div>
{% endexample %}

### Textarea

Form control which supports multiple lines of text. Change `rows` attribute as necessary.

{% example html %}
<textarea class='input' rows='3'></textarea>
{% endexample %}

## Selectors

>Including Dropdowns, Checkboxes, Radio Buttons, and more...

### Checkboxes

We should use one container with class of `.checkbox-wrapper` as the wrapper of `checkbox`.

{% example html %}
<div class='checkbox-example'>
  <label class='checkbox-wrapper'>
    <span class="checkbox">
      <input class='checkbox__input' type='checkbox' checked>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Checked</span>
    </span>
  </label>
  <label class='checkbox-wrapper'>
    <span class="checkbox">
      <input class='checkbox__input' type='checkbox'>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Unchecked</span>
    </span>
  </label>
  <label class='checkbox-wrapper'>
    <span class="checkbox">
      <input class='checkbox__input' type='checkbox' disabled>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Disabled</span>
    </span>
  </label>
  <label class='checkbox-wrapper'>
    <span class="checkbox">
      <input class='checkbox__input' type='checkbox' checked disabled>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Checked and Disabled</span>
    </span>
  </label>
</div>
{% endexample %}

Controling different sizing for checkboxes and you could remove the `checkbox__text` CSS class and use `label` checkbox text but you should add your `for` attribute for your `label`.

{% example html %}
<div class='checkbox-example'>
  <label class='checkbox-wrapper'>
    <span class="checkbox checkbox--sm">
      <input class='checkbox__input' type='checkbox' checked>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Checked</span>
    </span>
  </label>
  <label class='checkbox-wrapper'>
    <span class="checkbox">
      <input class='checkbox__input' type='checkbox' checked>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Checked</span>
    </span>
  </label>
  <label class='checkbox-wrapper'>
    <span class="checkbox checkbox--lg">
      <input class='checkbox__input' type='checkbox' checked>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>Checked</span>
    </span>
  </label>
</div>
{% endexample %}

We also could handle label with multiple paragraphs with `BFC`.

{% example html %}
<div class='checkbox-example'>
  <label class='checkbox-wrapper'>
    <span class="checkbox">
      <input class='checkbox__input' type='checkbox' checked>
      <span class='checkbox__inner'></span>
      <span class='checkbox__text'>
        With multiple repos, you typically either have one project per repo, or an umbrella of related projects per repo, but that forces you to define what a “project” is for your particular team or company, and it sometimes forces you to split and merge repos for reasons that are pure overhead. For example, having to split a project because it’s too big or has too much history for your VCS is not optimal.
        With a monorepo, projects can be organized and grouped together in whatever way you find to be most logically consistent, and not just because your version control system forces you to organize things in a particular way. Using a single repo also reduces overhead from managing dependencies.
        A side effect of the simplified organization is that it’s easier to navigate projects. The monorepos I’ve used let you essentially navigate as if everything is on a networked file system, re-using the idiom that’s used to navigate within projects. Multi repo setups usually have two separate levels of navigation – the filesystem idiom that’s used inside projects, and then a meta-level for navigating between projects.
        A side effect of that side effect is that, with monorepos, it’s often the case that it’s very easy to get a dev environment set up to run builds and tests. If you expect to be able to navigate between projects with the equivalent of cd, you also expect to be able to do cd; make. Since it seems weird for that to not work, it usually works, and whatever tooling effort is necessary to make it work gets done1. While it’s technically possible to get that kind of ease in multiple repos, it’s not as natural, which means that the necessary work isn’t done as often.
      </span>
    </span>
  </label>
</div>
{% endexample %}

### Radio

{% example html %}
<div>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" class="radio__input" checked>
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
</div>
{% endexample %}

There're three sizes for Radio button: the default `.radio`, the SM Radio with `.radio--sm`, the LG Radio with `.radio-lg`.
As well as Radio button has its status: `checked` and `disabled`.

{% example html %}
<div>
  <h1>SM</h1>
  <label class="radio-wrapper">
    <span class="radio radio--sm">
      <input type="radio" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
  <label class="radio-wrapper">
    <span class="radio radio--sm">
      <input type="radio" class="radio__input" checked>
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
</div>
<div>
  <h1>Default</h1>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" class="radio__input" checked>
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
</div>
<div>
  <h1>LG</h1>
  <label class="radio-wrapper">
    <span class="radio radio--lg">
      <input type="radio" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
  <label class="radio-wrapper">
    <span class="radio radio--lg">
      <input type="radio" class="radio__input" checked>
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
</div>
<div>
  <h1>Disabled & Checked</h1>
  <label class="radio-wrapper">
    <span class="radio radio--sm radio--disabled">
      <input type="radio" disabled class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
  <label class="radio-wrapper">
    <span class="radio radio radio--disabled">
      <input type="radio" disabled checked class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
  <label class="radio-wrapper">
    <span class="radio radio--lg radio--disabled">
      <input type="radio" disabled checked class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <br />
</div>
{% endexample %}

### Radio Group

Also, we could group multiple radioes into one group

{% example html %}
<div class='radio-group'>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" name="radio-group" class="radio__input" checked>
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" name="radio-group" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" name="radio-group" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
</div>
{% endexample %}

How's about put the radio group vertically?

{% example html %}
<div class='radio-group-vertical'>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" name="radio-group--vertically" class="radio__input" checked>
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" name="radio-group--vertically" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
  <label class="radio-wrapper">
    <span class="radio">
      <input type="radio" name="radio-group--vertically" class="radio__input">
      <span class="radio__inner"></span>
      <span>I'M A RADIO</span>
    </span>
  </label>
</div>
{% endexample %}


### Toggle

{% example html %}
<label class="toggle">
  <input type="checkbox">
  <span class="toggle__text">u can toggle me</span>
</label>
<span>Some thing else</span>
{% endexample %}

### Dropdowns

#### Dropdown flat(default)

{% example html%}
<div class="dropdown">
  <button class="btn dropdown__button trigger" type="button" >
    <span class="dropdown__button-text">
      Select OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect OneSelect One
    </span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
{%endexample%}

#### Dropdown gradient

{% example html%}
<div class="dropdown dropdown--gradient">
  <button class="dropdown__button trigger" type="button" >
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
{%endexample%}

#### Dropdown borderless

{% example html%}
<div class="dropdown dropdown--borderless">
  <button class="dropdown__button trigger" type="button" >
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
{%endexample%}

#### With search

{% example html%}
<div class="dropdown dropdown--with-search">
  <button class="dropdown__button" type="button" >
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <div class="dropdown__menu__search-box">
        <i class='icon-search'></i>
        <input class='input' type='text' placeholder='Enter search here...'></div>
    </li>
    <li class="dropdown__menu-divider"></li>
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
{%endexample%}

#### Dropdown size

{% example html%}
<div class="dropdown">
  <button class="dropdown__button" type="button" >
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
<br/>
<div class="dropdown dropdown--lg">
  <button class="dropdown__button" type="button" >
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
{%endexample%}

#### Dropdown with prefixed-icon

{% example html%}
<div class="dropdown">
  <button class="dropdown__button" type="button" >
    <i class="dropdown__prefix-icon icon-location"></i>
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
<br/>
<div class="dropdown dropdown--lg">
  <button class="dropdown__button" type="button" >
    <i class="dropdown__prefix-icon icon-location"></i>
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
  <ul class="dropdown__menu">
    <li>
      <a href="#">Action</a>
    </li>
    <li>
      <a href="#">Another action</a>
    </li>
    <li>
      <a href="#">Something else here</a>
    </li>
  </ul>
</div>
{%endexample%}

#### Dropdown with disabled

{% example html%}
<div class="dropdown">
  <button class="dropdown__button disabled" type="button" >
    <i class="dropdown__prefix-icon icon-location"></i>
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
</div>
<br/>
<div class="dropdown dropdown--lg">
  <button class="dropdown__button disabled" type="button" >
    <i class="dropdown__prefix-icon icon-location"></i>
    <span class="dropdown__button-text">Select One</span>
    <span class="icon-chevron-down"></span>
  </button>
</div>
{%endexample%}

### Calendar and time

{% example html%}
<style>
.markdown-body .date-picker table th {
  border: none;
  padding: 0 !important;
}

.markdown-body .date-picker table tr:nth-child(2n) {
  background-color: #fff;
}

.markdown-body .date-picker table td {
  padding: 3px 0;
}
.date-picker .date-picker__table tr {
  border: none;
}
.date-picker .date-picker__table td {
  border: none;
  padding: 3px 0;
}
.date-picker__calendar {
  position: relative !important;
}
</style>
<div class="date-picker">
  <div class="date-picker__calendar">
    <header class="date-picker__header">
      <span class="icon-chevron-left date-picker__left-arrow row-gutter" title="Previous month"></span>
      <span class="icon-chevron-right date-picker__right-arrow row-gutter" title="Next month"></span>
      <h1 class="date-picker__calendar-title">September 2016</h1>
    </header>
    <table class="date-picker__table" style="display:table">
      <thead>
        <tr>
          <th title="Sunday">S</th>
          <th title="Monday">M</th>
          <th title="Tuesday">T</th>
          <th title="Wednesday">W</th>
          <th title="Thursday">T</th>
          <th title="Friday">F</th>
          <th title="Saturday">S</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="date-picker--other-month">28</td>
          <td class="date-picker--other-month">29</td>
          <td class="date-picker--other-month">30</td>
          <td class="date-picker--other-month">31</td>
          <td class="">1</td>
          <td class="">2</td>
          <td class="">3</td>
        </tr>
        <tr>
          <td class="">4</td>
          <td class="">5</td>
          <td class="">6</td>
          <td class="">7</td>
          <td class="">8</td>
          <td class="">9</td>
          <td class="">10</td>
        </tr>
        <tr>
          <td class="">11</td>
          <td class="">12</td>
          <td class="">13</td>
          <td class="">14</td>
          <td class="">15</td>
          <td class="">16</td>
          <td class="">17</td>
        </tr>
        <tr>
          <td class="">18</td>
          <td class="">19</td>
          <td class="">20</td>
          <td class="">21</td>
          <td class="">22</td>
          <td class="">23</td>
          <td class="">24</td>
        </tr>
        <tr>
          <td class="date-picker--selected">25</td>
          <td class="">26</td>
          <td class="">27</td>
          <td class="date-picker--today">28</td>
          <td class="">29</td>
          <td class="">30</td>
          <td class="date-picker--other-month">1</td>
        </tr>
        <tr>
          <td class="date-picker--other-month">2</td>
          <td class="date-picker--other-month">3</td>
          <td class="date-picker--other-month">4</td>
          <td class="date-picker--other-month">5</td>
          <td class="date-picker--other-month">6</td>
          <td class="date-picker--other-month">7</td>
          <td class="date-picker--other-month">8</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
{%endexample%}

### More Button

{% example html%}
<div class="row row-gutter">
  <div class="col col-4">
    <div class="dropdown more-button">
      <button class="dropdown__button" type="button" >
        <span class="dropdown__button-text">More</span>
        <span class="icon-caret-down"></span>
      </button>
      <ul class="dropdown__menu">
        <li>
          <a href="#">Action</a>
        </li>
        <li>
          <a href="#">Another action</a>
        </li>
        <li>
          <a href="#">Something else here</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="col col-4">
    <div class="dropdown dropdown--with-search more-button">
      <button class="dropdown__button" type="button" >
        <span class="dropdown__button-text">More</span>
        <span class="icon-caret-down"></span>
      </button>
      <ul class="dropdown__menu">
        <li>
          <div class="dropdown__menu__search-box">
            <i class='icon-search'></i>
            <input class='input' type='text' placeholder='Enter search here...'></div>
        </li>
        <li class="dropdown__menu-divider"></li>
        <li>
          <a href="#">Action</a>
        </li>
        <li>
          <a href="#">Another action</a>
        </li>
        <li>
          <a href="#">Something else here</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="col col-4">
    <div class="dropdown more-button disabled">
      <button class="dropdown__button disabled" type="button" >
        <span class="dropdown__button-text">More And More</span>
        <span class="icon-caret-down"></span>
      </button>
      <ul class="dropdown__menu">
        <li>
          <a href="#">Action</a>
        </li>
        <li>
          <a href="#">Another action</a>
        </li>
        <li>
          <a href="#">Something else here</a>
        </li>
      </ul>
    </div>
  </div>
</div>
{%endexample%}


### File Upload

{% example html%}
<div id="file-upload" class="file-upload file-upload--xs">
  <div class="upload-componet">
    <label class="btn btn-xs">
      <input type="file"/>
      Choose File
    </label>
    <input disabled class="file-upload__text input" value="No file chosen" />
  </div>
</div>
<br />
<br />
<div class="file-upload file-upload--sm">
  <div class="upload-componet">
    <label class="btn btn-sm">
      <input type="file"/>
      Choose File
    </label>
    <input disabled class="file-upload__text input" value="No file chosen" />
  </div>
</div>
<br />
<br />
<div class="file-upload file-upload--lg">
  <div class="upload-componet">
    <label class="btn btn-lg">
      <input type="file"/>
      Choose File
    </label>
    <input disabled class="file-upload__text input" value="No file chosen" />
  </div>
</div>
<br />
<br />
<div class="file-upload file-upload--xl">
  <div class="upload-componet">
    <label class="btn btn-xl">
      <input type="file"/>
      Choose File
    </label>
    <input disabled class="file-upload__text input" value="No file chosen" />
  </div>
</div>
{%endexample%}

### Image Upload
{% example html%}
<div class="file-upload file-upload--sm" id="area">
  <div class="upload-componet">
    <label class="btn btn-sm">
      <input type="file"/>
      Choose File
    </label>
    <input disabled class="file-upload__text input" value="No file chosen" />
    <span class="file-error"></span>
  </div>
  <div class="format-text">
    <div>Format: JPG, JPEG, PNG or GIF. Size: Less than 3 MB.</div>
    <div>Dimensions: 2048 px width, 1536 px height maximum.</div>
  </div>
  <div class="file-preview" />
</div>
{%endexample%}
