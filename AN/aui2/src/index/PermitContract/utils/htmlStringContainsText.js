const htmlStringContainsText = html => html.replace(/<.+?>/g, '').trim() !== '';

export default htmlStringContainsText;
