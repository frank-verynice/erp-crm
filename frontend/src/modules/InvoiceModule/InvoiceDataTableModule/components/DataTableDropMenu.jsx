import { Menu } from 'antd';

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectItemById } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import uniqueId from '@/utils/uinqueId';
import history from '@/utils/history';

export default function DataTableDropMenu({ row, entity }) {
  const dispatch = useDispatch();

  const { erpContextAction } = useErpContext();
  const { modal } = erpContextAction;
  const item = useSelector(selectItemById(row._id));
  function Read() {
    dispatch(erp.currentItem({ data: item }));
    history.push(`/invoice/read/${row._id}`);
  }
  function RecordPayment() {
    dispatch(erp.currentItem({ data: item }));
    history.push(`/invoice/pay/${row._id}`);
  }
  function Edit() {
    dispatch(erp.currentAction({ actionType: 'update', data: item }));
    history.push(`/invoice/update/${row._id}`);
  }
  function Delete() {
    dispatch(erp.currentAction({ actionType: 'delete', data: item }));
    modal.open();
  }
  function Download() {
    window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${row._id}.pdf`, '_blank');
  }
  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<EyeOutlined />} onClick={Read}>
        Show
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<CreditCardOutlined />} onClick={RecordPayment}>
        Record Payment
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Edit}>
        Edit
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<FilePdfOutlined />} onClick={Download}>
        Download
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={Delete}>
        Delete
      </Menu.Item>
    </Menu>
  );
}
