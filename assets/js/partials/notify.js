export default function (){
    //TODO:: add suitable notify
    salla.notify.setNotifier((...data) => salla.log(...data));
}