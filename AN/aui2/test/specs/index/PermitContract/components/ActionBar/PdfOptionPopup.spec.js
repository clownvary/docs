import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PdfOptionPopup from 'index/PermitContract/components/ActionBar/PdfOptionPopup';

const createBlob = (
  content = JSON.stringify({ test: 'json' }),
  type = 'application/json'
) => new Blob([content], { type });

describe('index/PermitContract/components/ActionBar/PdfOptionPopup', () => {
  test('should render without errors', () => {
    const component = mount(<PdfOptionPopup />);
    expect(toJson(component)).toMatchSnapshot();
  });

  test('startDownload works correctly', () => {
    const component = mount(<PdfOptionPopup />);
    const instance = component.instance();

    const mockCreateObjectURL = jest.fn();
    const mockRevokeObjectURL = jest.fn();
    window.URL.createObjectURL = mockCreateObjectURL;
    window.URL.revokeObjectURL = mockRevokeObjectURL;

    const blob = createBlob();
    instance.startDownload(blob, 'test.json');

    expect(mockCreateObjectURL).toBeCalledWith(blob);
    expect(mockRevokeObjectURL).toBeCalled();
  });

  test('download works correctly for IE', () => {
    Object.defineProperties(navigator, {
      userAgent: {
        get: () => 'msie',
        configurable: true
      }
    });
    const component = mount(<PdfOptionPopup />);
    const instance = component.instance();

    const startDownloadMock = jest.fn();
    const msSaveOrOpenBlobMock = jest.fn();
    navigator.msSaveOrOpenBlob = msSaveOrOpenBlobMock;
    instance.startDownload = startDownloadMock;


    const blob = createBlob();
    const filename = 'test.json'

    instance.download({ payload: { blob, filename }});
    expect(msSaveOrOpenBlobMock).toBeCalledWith(blob, filename)
    expect(startDownloadMock).not.toBeCalled();
  });

  test('download works correctly for non-IE', () => {
    Object.defineProperties(navigator, {
      userAgent: {
        get: () => 'chrome',
        configurable: true
      }
    });
    const component = mount(<PdfOptionPopup />);
    const instance = component.instance();

    const startDownloadMock = jest.fn();
    const msSaveOrOpenBlobMock = jest.fn();
    navigator.msSaveOrOpenBlob = msSaveOrOpenBlobMock;
    instance.startDownload = startDownloadMock;

    const blob = createBlob();
    const filename = 'test.json'

    instance.download({ payload: { blob, filename }});
    expect(msSaveOrOpenBlobMock).not.toBeCalled();
    expect(startDownloadMock).toBeCalledWith(blob, filename);
  });

  test('download works correctly for non-IE', () => {
    const component = mount(<PdfOptionPopup />);
    const instance = component.instance();

    const startDownloadMock = jest.fn();
    const msSaveOrOpenBlobMock = jest.fn();
    navigator.msSaveOrOpenBlob = msSaveOrOpenBlobMock;
    instance.startDownload = startDownloadMock;

    const blob = createBlob();
    const filename = 'test.json'

    instance.download({ payload: { blob, filename }});
    expect(msSaveOrOpenBlobMock).not.toBeCalled();
    expect(startDownloadMock).toBeCalledWith(blob, filename);
  });

  test('handlePopupConfirm works correctly', () => {
    const props = {
      permitNumber: '123',
      savePdfAction: jest.fn(() => Promise.resolve())
    };

    const component = mount(<PdfOptionPopup {...props} />);
    const instance = component.instance();
    instance.download = jest.fn();
    instance.handlePopupConfirm();
    expect(props.savePdfAction).toBeCalled();
  });
});
