import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Loading from "./LoadSaveAnimation/Loading";
import DOMPurify from "dompurify";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ConferenceDisplay = () => {
  const [conferences, setConferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const conferencesRef = ref(db, "conferences");

    onValue(conferencesRef, (snapshot) => {
      const data = snapshot.val();
      const conferencesList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setConferences(conferencesList);
      setIsLoading(false);
    });

    return () => {
      /* cleanup */
    };
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <div className="container mx-auto px-6 lg:px-8 py-8 bg-gradient-to-b from-sky-100 to-white">
        <h2 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-wide">
          International Research Conferences
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {conferences.map((conference) => (
            <div
              key={conference.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <div className="md:flex">
                <div className="md:w-2/3">
                {conference.title && conference.title.length > 0 && (

                  <h3 className="text-2xl font-bold mb-2 text-indigo-900">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(conference.title),
                      }}
                      className="ql-editor text-center"
                      />
                  </h3>
                    )}

                    {conference.date && conference.date.length > 0 && (

                      <p className="text-lg font-medium text-gray-700 mb-1">
                    <span className="text-gray-500">Date:</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(conference.date),
                      }}
                      className="ql-editor text-justify"
                      />
                  </p>
                    )}
                    {conference.location && conference.location.length > 0  && (

                      <p className="text-lg font-medium text-gray-700 mb-1 flex items-center">
                    <span className="text-gray-500">Location:</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(conference.location),
                      }}
                      className="ql-editor text-justify ml-2"
                      style={{ display: "inline" }} // Forces inline display to avoid block-level behavior
                    />
                  </p>
                    )}
                  {conference.description && conference.description.length > 0 && (

                    <p className="text-lg font-medium text-gray-700 mb-1">
                    <span className="text-gray-500">Description:</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(conference.description),
                      }}
                      className="ql-editor text-justify"
                      />
                  </p>
                    )}
                </div>
                <div className="md:w-1/3 my-auto">
                  {/* Display images if they exist */}
                  {conference.images && conference.images.length > 0 && (
                    <div className="mt-4 ">
                      <ImageGallery
                        items={conference.images.map((imageUrl) => ({
                          original: imageUrl,
                          thumbnail: imageUrl,
                        }))}
                        showThumbnails={true}
                        showFullscreenButton={true}
                        showPlayButton={false}
                        showBullets={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConferenceDisplay;
