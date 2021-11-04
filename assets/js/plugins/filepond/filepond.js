import * as FilePond from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
FilePond.registerPlugin(FilePondPluginImagePreview);
window.FilePond = FilePond;
window.FilePondPluginImagePreview = FilePondPluginImagePreview;