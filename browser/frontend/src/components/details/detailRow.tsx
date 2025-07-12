import React from "react";

export default function DetailRow({label, value}: {label: string, value: string | undefined})
{
    const notEmpty: boolean = value !== "" && value !== undefined && value !== null;
    const setLink: boolean = label === 'EMLO url';

    return (
      <>
          {notEmpty && <div>
              <div className="detailItemLabel">{label}</div>
              {setLink ? (
                  <div className="detailItemValue hcClickable" onClick={() => {window.open(value)}}>{value}</div>
              ) : (
                  <div className="detailItemValue">{value}</div>
              )}

          </div>}
      </>
    );
}