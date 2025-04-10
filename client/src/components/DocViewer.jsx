import React from 'react'
import DocViewer from "react-doc-viewer";

const DocViewerPage = (url) => {
    const docs = [
        { uri: url } // Local File
      ];
    
      return <DocViewer documents={docs} />;
}

export default DocViewerPage