import * as React from "react";

import api from "../../../api/api";

import Dropzone from "react-dropzone";
import classNames from "classnames";

interface IFile {
  fileName: string;
  url: string;
}

interface IProps {
  onFileUploaded: (files: any) => void;
}
interface IState {
  files: IFile[];
}

export class FileUploader extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      files: []
    };
  }

  public render() {
    const { files } = this.state;

    return (
      <div className={"file-uploader"}>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={classNames("dropzone", {
                  "dropzone--isActive": isDragActive
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Laat hier los...</p>
                ) : (
                  <p>Sleep hier een foto in</p>
                )}

                {/*{files.map(f => (*/}
                {/*<li key={f.name}>*/}
                {/*{f.name} ({f.progress} %)*/}
                {/*</li>*/}
                {/*))}*/}
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }

  onDrop = async file => {
    console.log(file);
    await api.postFile(file[0]).then((url: string) => {
      let { files } = this.state;

      files.push({ fileName: "", url });
    });

    console.log(this.state);
  };
}
