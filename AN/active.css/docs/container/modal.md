---
layout: page
title: Modal
---

## Modal

When a modal is opened **body** will have a class modal open, general usage for hiding overflow fo body

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

Modals have a set width of 650px to ensure optimal visibility at 720px, and still look fine on larger resolutions. Modal size should not change if it’s used for a step-by-step process. Paddings are set at 30px all around. Be sure to use at least a 16px font. Anything smaller will be more difficult to read as a line of text would go over the usual 50-75 characters limit.

### When to Use

- For action components related to the original item in view on the original window.
- For blocking information flow until required info is entered (e.g. login).
- For collecting configuration edits and options (e.g., advanced settings).
- Warning for a non-reversible action.
- To draw attention to vital information (this should be used sparingly to avoid bombardment).
- Secondary CTA – Can also exist as a link if the primary CTA is extremely vital (e.g., Cancel).
- It is against best practices to include too much content and functionality in modals. If that is the case, - the content and functionality should exist as it’s own page.

### Interaction Details

- ‘x’ icon – OnClick closes the pop-up with the cancel action taken.
- Buttons – OnClick performs specified action.
- Clicking outside of the modal area does NOT perform a close action.
- On open, the modal should slide down while the transparent background appears.


{% example html %}
<div class="modal" id="doc--modal">
    <section class="modal-box">
        <header class="modal-header">
            <h3 class="modal-title">Hello World</h3>
            <span class="icon-close modal-close doc--modal-close"></span>
        </header>
        <div class="modal-body">
            <strong>Lorem Ipsum</strong><br>
            <span>Amet aperiam molestiae quo perspiciatis explicabo recusandae, beatae? Impedit dolore nihil fugiat dolores laborum deleniti? Harum tempore voluptates maiores quisquam quisquam porro aperiam! Architecto et dignissimos deserunt quisquam dolores, nobis.</span>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary btn-sm doc--modal-close">CANCEL</button>
            <button class="btn btn-prmary btn-sm">OK</button>
        </div>
    </section>
</div>
<div class="modal-mask"></div>
<button id="doc--modal-trigger" class="btn btn-strong btn-sm">Open modal</button>
{% endexample %}
