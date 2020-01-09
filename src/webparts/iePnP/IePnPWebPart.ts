import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IePnPWebPartStrings';
import IePnP from './components/IePnP';
import { IIePnPProps } from './components/IIePnPProps';

import '@pnp/polyfill-ie11';

export interface IIePnPWebPartProps {
  description: string;
}

export default class IePnPWebPart extends BaseClientSideWebPart<IIePnPWebPartProps> {

  protected async onInit() {
    await super.onInit();
    console.log('init done');

    if (false) {
      const furtherTests = await import(
        /* webpackChunkName: 'further-tests' */
        './FurtherTests/FurtherTests'
      );
      furtherTests.start(this.context);
    }
  }

  public render(): void {
    const element: React.ReactElement<IIePnPProps > = React.createElement(
      IePnP,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
