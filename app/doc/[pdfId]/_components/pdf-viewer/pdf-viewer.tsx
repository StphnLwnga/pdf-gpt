"use client"

import React from 'react'
import { useTheme } from 'next-themes';
import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import LoadingPDFViewer from './loading';
import ErrorLoadingPDF from './error'


const PDFViewer = ({ pdfDoc }: { pdfDoc: string }) => {
  const { resolvedTheme } = useTheme();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-full w-full p-4">
      <React.Suspense fallback={<LoadingPDFViewer />}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js" >
          <div
            style={{
              height: '100%',
              width: '98%',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '5px',
            }}
          >
            <Viewer
              fileUrl={ `data:application/pdf;base64,${pdfDoc}` }
              enableSmoothScroll
              defaultScale={SpecialZoomLevel.PageFit}
              theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
              plugins={[defaultLayoutPluginInstance]}
              renderError={(error) => <ErrorLoadingPDF error={error} resolvedTheme={resolvedTheme} />}
            />
          </div>
        </Worker>
      </React.Suspense>
    </div>

  )
}

export default PDFViewer


/** TODO: handle upload file in input
 * const [pdfFile, setPDFFile] = useState(null)
  const [viewPDF, setViewPDF] = useState(null)
  const fileType = ['application/pdf']
  const handleChange = (e) => {
    let selectedFile = e.target.files[0]
    if(selectedFile) {
      if(selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (e) => {
          setPDFFile(e.target.result)
        }
      }
      else {
        setPDFFile(null)
      }
    }
    else {
      console.log("please select")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(pdfFile !== null) {
      setViewPDF(pdfFile)
    }
    else {
      setViewPDF(null)
    }
  }


  <form onSubmit={handleSubmit}>
    <input type="file" className='form-control' onChange={handleChange}/>
    <button type='submit' className='btn btn-success'>View PDF</button>
  </form>
 */