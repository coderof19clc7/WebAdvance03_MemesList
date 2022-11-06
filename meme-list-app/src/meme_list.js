import { useQuery } from '@tanstack/react-query';
import { Button, Row, Col, Image, Divider } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MemesList() {
    const [memeBoxIndex, setMemeBoxIndex] = useState(2)

    const { isFetching, data, refetch } = useQuery({
        queryKey: ["get_memes"], enabled: false,
        queryFn: async () => {
            return await axios.get("https://api.imgflip.com/get_memes")
        },
    })

    useEffect(() => {
        refetch()
    }, [memeBoxIndex]) // eslint-disable-line react-hooks/exhaustive-deps

    function renderGallery() {
        const galleryUI = [];
        if (isFetching) return galleryUI
        if (data) {
            const listMemes = data.data.data.memes
            const length = listMemes.length
            for (let i = 0; i < length; i++) {
                const meme = listMemes[i]
                if (meme.box_count === memeBoxIndex) {
                    galleryUI.push(
                        <Col span={6}>
                            <Image width={200} height={200} src={meme.url} />
                        </Col>
                    )
                }
            }
        }
        return galleryUI;
    }
    
    function renderButtons() {
        const buttonsList = [];
        for (let i = 2; i <= 5; i++) {
            buttonsList.push(
                <Col id={'btn' + i} span={6}>
                    <Button 
                        loading={isFetching && memeBoxIndex===i} 
                        disabled={isFetching && memeBoxIndex!==i}
                        onClick={() => setMemeBoxIndex(i)} 
                        shape="round" 
                        type={memeBoxIndex===i ? "primary" : "default"}
                    >
                        Meme box {i}
                    </Button>
                </Col>
            )
        }
        return buttonsList
    }

    return (
        <div className="App">
            <Row justify={'space-around'} gutter={[{md: 12, xs: 7},30]}>
                {renderButtons()}
            </Row>
            <Divider/>
            <Row justify={'space-around'} gutter={[{md: 12, xs: 7},30]}>
                {renderGallery()}
            </Row>
        </div>
    )
}

export default MemesList