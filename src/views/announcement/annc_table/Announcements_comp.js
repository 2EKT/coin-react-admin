import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead,
    CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton,
    CForm, CFormInput, CFormTextarea, CModal, CModalHeader,
    CModalTitle, CModalBody, CModalFooter
} from '@coreui/react';
import JoditEditor from 'jodit-react';
function Announcements_comp() {
    const [announcements, setAnnouncements] = useState([]);
    const [modal, setModal] = useState(false);
    const [disp, setdisp] = useState(false);
    const [editData, setEditData] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', video: '',blank1:'' });
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder:   'Enter View Detail',
        // editorClassName: 'editor-class',
        style: {
            background: '#27272E',
            color: 'rgba(255,255,255,0.5)',
        },
    }),
    []
);
    const fetchNotifications = async () => {
        try {
            const response = await fetch('https://coinselection.fun/appApi/fetchnNotification.php');
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setAnnouncements(data);
            setdisp(true);
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);
    const handleEditorChange = (data) => {
        // const data = editor.getData();
        // setFormData({ ...formData, blank1: data });
        setFormData({ ...formData, blank1: data });
    };
    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Open Modal for Add/Edit
    const handleOpenModal = (announcement = null) => {
        setEditData(announcement);
        setFormData(announcement ? { ...announcement } : { title: '', description: '', video: '' ,blank1:''});
        setModal(true);
    };

    // Save Announcement
    const handleSave = async () => {
        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("blank1", formData.blank1);
        form.append("date", new Date().toISOString().split('T')[0]); // Current date in YYYY-MM-DD
        form.append("video", formData.video);
        form.append("showVideo", 'true'); // Ensure this is 'true' if you want to show the video

        try {
            const url = editData
                ? `https://coinselection.fun/admin_api/update_anouncement.php?id=${editData.id}`
                : "https://coinselection.fun/admin_api/insert_anouncement.php";

            const response = await fetch(url, {
                method: "POST",
                body: form,
            });

            const result = await response.json();

            if (result[0].result === "1") {
                alert("Announcement saved successfully!");
                fetchNotifications();
            } else {
                alert("Failed to save announcement.");
            }
        } catch (error) {
            console.error("Error saving announcement:", error);
            alert("Something went wrong.");
        }

        setModal(false);
        setEditData(null);
        setFormData({ title: '', description: '', video: '' });
    };

    // Delete Announcement
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this announcement?")) return;

        try {
            const response = await fetch(`https://coinselection.fun/admin_api/delete_anouncement.php?id=${id}`, {
                method: "GET",
            });

            const result = await response.json();

            if (result[0].result === "1") {
                alert("Announcement deleted successfully!");
                fetchNotifications();
            } else {
                alert("Failed to delete announcement.");
            }
        } catch (error) {
            console.error("Error deleting announcement:", error);
            alert("Something went wrong.");
        }
    };

    return (
        disp == false ? <p>Loading ...</p> : <div className="container mt-4">
            <CRow>
                <CCol md={12}>
                    <CCard className="shadow-lg">
                        <CCardHeader className="bg-primary text-white d-flex justify-content-between">
                            <h5>Announcements</h5>
                            <CButton color="success" onClick={() => handleOpenModal()}>Add New</CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>ID</CTableHeaderCell>
                                        <CTableHeaderCell>Title</CTableHeaderCell>
                                        <CTableHeaderCell>Description</CTableHeaderCell>
                                        <CTableHeaderCell>View Detail</CTableHeaderCell>
                                        <CTableHeaderCell>Video</CTableHeaderCell>
                                        
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {announcements.map(announcement => (
                                        <CTableRow key={announcement.id}>
                                            <CTableDataCell>{announcement.id}</CTableDataCell>
                                            <CTableDataCell>{announcement.title}</CTableDataCell>
                                            <CTableDataCell>{announcement.description}</CTableDataCell>
                                            <CTableDataCell dangerouslySetInnerHTML={{ __html: announcement.blank1 }}></CTableDataCell>
                                            <CTableDataCell>
                                                {announcement.showVideo === "1" && announcement.video ? (
                                                    <iframe
                                                        width="100%"
                                                        height="56"
                                                        src={`https://www.youtube.com/embed/${announcement.video.split("v=")[1]}`}
                                                        title="YouTube video"
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : 'No Video'}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton
                                                    color="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleOpenModal(announcement)}
                                                >
                                                    Edit
                                                </CButton>
                                                <CButton color="danger" size="sm" onClick={() => handleDelete(announcement.id)}>
                                                    Delete
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* Add/Edit Modal */}
            <CModal visible={modal} onClose={() => setModal(false)}>
                <CModalHeader>
                    <CModalTitle>{editData ? 'Edit Announcement' : 'Add Announcement'}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            className="mb-2"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                        <CFormTextarea
                            className="mb-2"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                        />
                       <JoditEditor
                        //  placeholder="Description"
                        className="mb-2 mt-3"
                        ref={editor}
		             	config={config}
                        name='blank1'
                        value={formData.blank1}
                            onChange={handleEditorChange}
                        />
                        <CFormInput
                            className="mb-2 mt-3"
                            name="video"
                            value={formData.video}
                            onChange={handleChange}
                            placeholder="Video URL"
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setModal(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleSave}>Save</CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
}

export default Announcements_comp;
