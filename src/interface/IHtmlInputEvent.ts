export default interface IHTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}