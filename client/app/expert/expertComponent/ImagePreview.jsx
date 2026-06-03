import React, { useEffect } from 'react';
import { DownloadOutlined, LeftOutlined, RightOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined, } from '@ant-design/icons';
import { Image, Modal, Slider, Space } from 'antd';
import { Trash2 } from 'lucide-react';


const ImagePreview = ({ images, setUiUpdate, uiUpdate, deleteImage }) => {
    const [current, setCurrent] = React.useState(0);

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Delete Image",
            content: "Are you sure you want to delete this image?",
            okText: "Delete",
            cancelText: "Cancel",

            async onOk() {
                const res = await deleteImage?.(id);
                console.log("res", res);

                if (res?.success) {
                    setUiUpdate(!uiUpdate);
                }
            },
        });
    }

    const imageList = [];

    if (images) {
        images.forEach((image) => {
            imageList.push({
                url: image.url,
                public_id: image.public_id
            });
        })
    }

    const onDownload = () => {
        const url = imageList[current];
        const suffix = url.slice(url.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(blobUrl);
                link.remove();
            });
    };

    return (
        <Image.PreviewGroup
            preview={{
                actionsRender: (
                    _,
                    {
                        transform: { scale },
                        actions: {
                            onActive,
                            onFlipY,
                            onFlipX,
                            onRotateLeft,
                            onRotateRight,
                            onZoomOut,
                            onZoomIn,
                            onReset,
                        },
                    },
                ) => {
                    const handleScaleChange = nextScale => {
                        if (nextScale > scale) {
                            onZoomIn();
                        } else if (nextScale < scale) {
                            onZoomOut();
                        }
                    };

                    return (
                        <Space size={12} className="toolbar-wrapper">
                            <LeftOutlined disabled={current === 0} onClick={() => onActive?.(-1)} />
                            <RightOutlined
                                disabled={current === imageList.length - 1}
                                onClick={() => onActive?.(1)}
                            />
                            <DownloadOutlined onClick={onDownload} />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <Slider
                                min={1}
                                max={50}
                                step={0.1}
                                value={scale}
                                styles={{ root: { width: 100, marginInline: 12 } }}
                                onChange={handleScaleChange}
                            />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                            <UndoOutlined onClick={onReset} />
                        </Space>
                    );
                },
                onChange: index => {
                    setCurrent(index);
                },
            }}
        >
            <div className={`${imageList?.length / 2 === 0 ? 'justify-center' : 'justify-start'} flex flex-wrap gap-5 mb-20`}>
                {imageList.map((item, index) => (
                    <div key={item.public_id} className="relative rounded-xl overflow-hidden h-30!">
                        <Image alt={`image-${index}`} src={item.url} width={200} className='h-30! object-cover' />

                        {
                            deleteImage &&
                            <button onClick={() => handleDelete(item.public_id)} className="text-white cursor-pointer bg-black/50 p-2 rounded-full absolute bottom-2 right-2">
                                <Trash2 className='size-4' />
                            </button>
                        }

                    </div>
                ))}
            </div>
        </Image.PreviewGroup>
    );
};

export default ImagePreview;