$body = document.getElementsByTagName('body')[0]
$docModal = document.getElementById('doc--modal')
$docModalTrigger = document.getElementById('doc--modal-trigger')
$docModalClose = document.getElementsByClassName('doc--modal-close')

$docModalTrigger.addEventListener('click', function () {
    $body.classList.add('modal-open')
    $docModal.classList.add('is-open')
})

for(var i = 0; i < $docModalClose.length; i ++) {
    $docModalClose[i].addEventListener('click', function () {
        $body.classList.remove('modal-open')
        $docModal.classList.remove('is-open')
    })
}
