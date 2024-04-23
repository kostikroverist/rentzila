import React, { Dispatch, FC, useCallback, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Announcement } from "../../interface/AnnouncementInterface";
import { renderToString } from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import L from "leaflet";
const iconUrl = `data:image/svg+xml;base64,${btoa(
  renderToString(<FaLocationDot />)
)}`;
const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [30, 30],
});

type Props = {
  data: Announcement[];
  filterData: Announcement[];
  setFilterData: Dispatch<React.SetStateAction<Announcement[]>>;
};
const MapComponent: FC<Props> = ({ data, filterData, setFilterData }) => {
  const map = useMap();
  const updateVisibleMarkers = useCallback(() => {
    const bounds = map.getBounds();
    const newMarkers = [];
    for (const point of data) {
      if (
        bounds.contains(
          point.location as L.LatLngBoundsExpression | L.LatLngExpression
        )
      ) {
        console.log(newMarkers);
        newMarkers.push(point);
      }
    }
    setFilterData(newMarkers);
  }, [data, map, setFilterData]);
  useEffect(() => {
    if (!map) return;
    updateVisibleMarkers();

    map.on("dragend", function () {
      updateVisibleMarkers();
    });
    map.on("zoomend", function () {
      updateVisibleMarkers();
    });
  }, [map, updateVisibleMarkers]);

  return (
    <>
      {filterData.map((dataAnnouncement) => (
        <Marker
          key={`${dataAnnouncement.img}${dataAnnouncement.location[0]}`}
          position={[
            dataAnnouncement.location[0],
            dataAnnouncement.location[1],
          ]}
          draggable={false}
          icon={DefaultIcon}
        >
          <Popup className="w-72">
            <img src={dataAnnouncement.img} />
            <p>Назва: {dataAnnouncement.title}</p>
            <p>Опис: {dataAnnouncement.description}</p>
            <p>
              Варість:{" "}
              <span className="font-bold"> {dataAnnouncement.price}грн</span>
            </p>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapComponent;
